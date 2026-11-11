import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { createInterface } from "node:readline/promises";
import { tool, createAgent } from "langchain";
import * as z from "zod";

dotenv.config();

// tool syntax => tool({},{})
const createEventTool = tool(
  async function ({ date, title, description }) {
    events.push({
      date,
      title,
      description,
    });
    return "Event Created";
  },
  {
    name: "createEvent",
    description: "Create new event with date, title ans description",

    // Zod is used for input validation
    schema: z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  },
);

const getEventTool = tool(
  async function ({ events }) {
    return events;
  },
  {
    name: "getEvents",
    description: "Retrives all events",
    schema: z.object({}),
  },
);

// readline allow user to write prompt.
const readline = createInterface({
  input: process.stdin, // input is used for the user to write prompt.
  output: process.stdout, //  output is used for the user to see the response.
});

// Select Model
const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const message = []; // Messages (arr) is used to remember converation

const agent = createAgent({
  model,
  tools: [createEventTool, getEventTool],
});

while (true) {
  const userInput = await readline.question("Enter Inp: ");
  const stream = await agent.stream(
    {
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    },
    { streamMode: "messages" },
  );

  for await (const [chunk] of stream) {
    process.stdout.write(chunk.content);
  }

  process.stdout.write("\n");
}

// while (true) {
//   const userInpurt = await readline.question("Write Somethings: ");
//   message.push({ role: "user", content: userInpurt });

//   const stream = await model.stream(message); // stream is used for the giving the response in the chunks...

//   let aimessage = "";
//   for await (const chunk of stream) {
//     aimessage += chunk.content;
//     process.stdout.write(chunk.content);
//   }

//   message.push({ role: "assistant", content: aimessage });

//   process.stdout.write("\n");
// }
