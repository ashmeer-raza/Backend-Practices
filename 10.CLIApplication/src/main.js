import { getSettings } from "./utils/settings.js";

async function main() {
  const setting = await getSettings();
  console.log(setting);
}

export default main;
