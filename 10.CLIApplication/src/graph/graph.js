import { StateGraph, START, END } from "@langchain/langgraph";
import { LLMNode } from "./node.js";
import * as z from "zod"; // zod will be used for defining the State(schema/Formate of the input and output of the graph)
import rl from "../utils/readline.js";
import { HumanMessage } from "langchain";

const stateFormate = z.object({
  messages: z.array(z.any()),
});

const graph = new StateGraph(stateFormate)
  .addNode("LLMNode", LLMNode)
  .addEdge(START, "LLMNode")
  .addEdge("LLMNode", END)
  .compile();

export default async function initGraph() {
  let messages = [];
  while (true) {
    const userInput = await rl.question("[User]: ");
    messages.push(new HumanMessage(userInput));

    const response = await graph.invoke({
      messages,
    });
    messages = response.messages;

    console.log("[AI]: ", response);
  }
}
