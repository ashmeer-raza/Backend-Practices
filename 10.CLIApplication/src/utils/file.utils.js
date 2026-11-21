import fs from "fs/promises"; // File System
import path from "path";
import { CONFIG_DIR } from "./constant.js";

// Return the content of setting file (create if it does not exist)
export async function getSettingsFile() {
  // ensure the config dir exists
  try {
    // check .beta folder exists
    await fs.access(CONFIG_DIR);

    // if not, it will create folder
  } catch (error) {
    await fs.mkdir(CONFIG_DIR, { recursive: true }); // Creates missing parent directories too.
  }

  // check if settingFile exists
  const settingFilePath = path.join(CONFIG_DIR, "setting.json");

  try {
    await fs.access(settingFilePath); // check setting.json file
    const content = await fs.readFile(settingFilePath, "utf-8"); // "utf-8" converts the file content into a readable string instead of returning a Buffer.
    return JSON.parse(content);
  } catch (error) {
    await fs.writeFile(settingFilePath, JSON.stringify({})); // if no file exists, it will create one
    return {};
  }
}

// Save the API key to the settings file
export async function saveApiKey(apiKey) {
  // ensure the config dir exists
  const settingsFilePath = path.join(CONFIG_DIR, "setting.json");

  // Read the existing settings file content
  const settingsContent = await getSettingsFile();

  // Update the settings content with the new API key
  await fs.writeFile(
    settingsFilePath,
    JSON.stringify({ ...settingsContent, apiKey }),
  );
}

// Get the API key from the settings file
export async function getApiKey() {
  const settings = await getSettingsFile();
  return settings.apiKey || null;
}
