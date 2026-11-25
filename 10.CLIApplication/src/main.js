import { getSettingsFile, saveApiKey, getApiKey } from "./utils/file.utils.js";
import rl from "./utils/readline.js";
import initGraph from "./graph/graph.js";

async function main() {
  const setting = await getSettingsFile();

  if (!setting.apiKey) {
    const apiKey = await rl.question("Please enter your API key: ");
    // Save the API key to the settings file

    await saveApiKey(apiKey);
  }

  const response = await getApiKey();

  if (response.error) {
    console.error("Error:", response.error);

    const apiKey = await rl.question("Please enter your API key: ");
    await saveApiKey(apiKey);
    return main();
  }

  const apiKey = response.apiKey;
  await initGraph();
  rl.close();
}

export default main;
