import * as fs from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  installClaudeSkills,
  installConfigs,
  installWorkflows,
  REPO,
} from "../lib/skills.js";

vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  cpSync: vi.fn(),
}));

describe("skills.ts - Workflow and Config Installation", () => {
  const mockSourceDir = "/tmp/extracted-repo";
  const mockTargetDir = "/tmp/test-project";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("installWorkflows", () => {
    it("should skip if source directory does not exist", () => {
      (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        false,
      );

      installWorkflows(mockSourceDir, mockTargetDir);

      expect(fs.cpSync).not.toHaveBeenCalled();
    });

    it("should copy workflows directory from source to target", () => {
      (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        true,
      );

      installWorkflows(mockSourceDir, mockTargetDir);

      const src = join(mockSourceDir, ".agents", "workflows");
      const dest = join(mockTargetDir, ".agents", "workflows");
      expect(fs.mkdirSync).toHaveBeenCalledWith(dest, { recursive: true });
      expect(fs.cpSync).toHaveBeenCalledWith(src, dest, {
        recursive: true,
        force: true,
      });
    });
  });

  describe("installConfigs", () => {
    it("should copy config directory when it exists", () => {
      (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        true,
      );

      installConfigs(mockSourceDir, mockTargetDir);

      const configSrc = join(mockSourceDir, ".agents", "config");
      const configDest = join(mockTargetDir, ".agents", "config");
      expect(fs.cpSync).toHaveBeenCalledWith(configSrc, configDest, {
        recursive: true,
        force: true,
      });
    });

    it("should copy mcp.json when it exists", () => {
      (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        true,
      );

      installConfigs(mockSourceDir, mockTargetDir);

      const mcpSrc = join(mockSourceDir, ".agents", "mcp.json");
      const mcpDest = join(mockTargetDir, ".agents", "mcp.json");
      expect(fs.cpSync).toHaveBeenCalledWith(mcpSrc, mcpDest);
    });
  });
});

describe("installClaudeSkills", () => {
  const mockSourceDir = "/tmp/extracted-repo";
  const mockTargetDir = "/tmp/test-project";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should copy .claude/skills and .claude/agents directories", () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      true,
    );

    installClaudeSkills(mockSourceDir, mockTargetDir);

    expect(fs.cpSync).toHaveBeenCalledWith(
      join(mockSourceDir, ".claude", "skills"),
      join(mockTargetDir, ".claude", "skills"),
      { recursive: true, force: true },
    );
    expect(fs.cpSync).toHaveBeenCalledWith(
      join(mockSourceDir, ".claude", "agents"),
      join(mockTargetDir, ".claude", "agents"),
      { recursive: true, force: true },
    );
  });

  it("should skip if source directories do not exist", () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      false,
    );

    installClaudeSkills(mockSourceDir, mockTargetDir);

    expect(fs.cpSync).not.toHaveBeenCalled();
  });
});

describe("skills.ts - repository metadata", () => {
  it("should use the correct GitHub repository", () => {
    expect(REPO).toBe("first-fluke/oh-my-agent");
  });
});
