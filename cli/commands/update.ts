import { cpSync } from "node:fs";
import { join } from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";
import {
  fetchRemoteManifest,
  getLocalVersion,
  saveLocalVersion,
} from "../lib/manifest.js";
import { migrateToAgents } from "../lib/migrate.js";
import {
  createCliSymlinks,
  detectExistingCliSymlinkDirs,
  getInstalledSkillNames,
  installClaudeSkills,
} from "../lib/skills.js";
import { downloadAndExtract } from "../lib/tarball.js";

export async function update(): Promise<void> {
  console.clear();
  p.intro(pc.bgMagenta(pc.white(" 🛸 oh-my-agent update ")));

  const cwd = process.cwd();

  // Auto-migrate from legacy .agent/ to .agents/
  const migrations = migrateToAgents(cwd);
  if (migrations.length > 0) {
    p.note(
      migrations.map((m) => `${pc.green("✓")} ${m}`).join("\n"),
      "Migration",
    );
  }
  const spinner = p.spinner();

  try {
    spinner.start("Checking for updates...");

    const remoteManifest = await fetchRemoteManifest();
    const localVersion = await getLocalVersion(cwd);

    if (localVersion === remoteManifest.version) {
      spinner.stop(pc.green("Already up to date!"));
      p.outro(`Current version: ${pc.cyan(localVersion)}`);
      return;
    }

    spinner.message(
      `Downloading ${pc.cyan(remoteManifest.version)}...`,
    );

    const { dir: repoDir, cleanup } = await downloadAndExtract();

    try {
      spinner.message("Copying files...");

      cpSync(join(repoDir, ".agents"), join(cwd, ".agents"), {
        recursive: true,
        force: true,
      });

      await saveLocalVersion(cwd, remoteManifest.version);

      const cliTools = detectExistingCliSymlinkDirs(cwd);
      if (cliTools.includes("claude")) {
        installClaudeSkills(repoDir, cwd);
      }

      spinner.stop(`Updated to version ${pc.cyan(remoteManifest.version)}!`);

      if (cliTools.length > 0) {
        const skillNames = getInstalledSkillNames(cwd);
        if (skillNames.length > 0) {
          const { created } = createCliSymlinks(cwd, cliTools, skillNames);
          if (created.length > 0) {
            p.note(
              created.map((s) => `${pc.green("→")} ${s}`).join("\n"),
              "Symlinks updated",
            );
          }
        }
      }

      p.outro(
        `${remoteManifest.metadata.totalFiles} files updated successfully`,
      );
    } finally {
      cleanup();
    }
  } catch (error) {
    spinner.stop("Update failed");
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
