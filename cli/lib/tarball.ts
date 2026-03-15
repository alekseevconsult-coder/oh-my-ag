import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { REPO } from "./skills.js";

export interface ExtractedRepo {
  dir: string;
  cleanup: () => void;
}

export async function downloadAndExtract(): Promise<ExtractedRepo> {
  const tempDir = mkdtempSync(join(tmpdir(), "oh-my-agent-"));

  try {
    const url = `https://api.github.com/repos/${REPO}/tarball/main`;
    const res = await fetch(url, {
      headers: { "User-Agent": "oh-my-agent-cli" },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const tarballPath = join(tempDir, "repo.tar.gz");
    writeFileSync(tarballPath, Buffer.from(await res.arrayBuffer()));

    execSync(`tar -xzf "${tarballPath}" -C "${tempDir}" --strip-components=1`, {
      stdio: "pipe",
      timeout: 30000,
    });

    rmSync(tarballPath);
  } catch (error) {
    rmSync(tempDir, { recursive: true, force: true });
    throw new Error(
      `Failed to download repository archive: ${error instanceof Error ? error.message : error}`,
    );
  }

  return {
    dir: tempDir,
    cleanup: () => rmSync(tempDir, { recursive: true, force: true }),
  };
}
