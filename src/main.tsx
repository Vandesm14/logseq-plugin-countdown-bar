import "@logseq/libs";
import { registerCommand } from "./register-command";

function main() {
  const pluginId = logseq.baseInfo.id;
  logseq.hideMainUI();
  console.info(`#${pluginId}: MAIN`);
  registerCommand();
  console.info(`#${pluginId}: MAIN DONE`);
}

logseq.ready(main).catch(console.error);
