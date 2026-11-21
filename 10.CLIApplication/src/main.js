import { getSettingsFile } from "./utils/file.utils.js";

async function main() {
  const setting = await getSettingsFile();
  console.log(setting);
}

export default main;
