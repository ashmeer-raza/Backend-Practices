import { ChatGroq } from "@langchain/groq";
import { getApiKey } from "../utils/file.utils.js";
import { AIMessage } from "langchain";
import { upserFilesTools } from "../ai/tools/files.tools.js";

/**
 * Handle LLM node logic for the graph
 * @param {Object} state - The current state of the graph
 * @returns{promise<Object>} - The updated state after processing the LLM node
 */

export async function LLMNode(state) {
  const apiKey = await getApiKey();

  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey,
  });

  const modelWithTool = model.bindTools([upserFilesTools]);

  const stream = await model.stream(state.messages);

  process.stdout.write("[AI]: ");

  let aiMessage = "";

  for await (const chunk of stream) {
    process.stdout.write(chunk.content);
    aiMessage += chunk.content;
  }
  process.stdout.write("\n");

  return {
    messages: [...state.messages, new AIMessage(aiMessage)],
  };
}
