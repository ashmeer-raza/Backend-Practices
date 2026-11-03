import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { createInterface } from "node:readline/promises";

dotenv.config();

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const message = []; // Messages (arr) is used to remember converation

while (true) {
  const userInpurt = await readline.question("Write Somethings: ");
  message.push({ role: "user", content: userInpurt });

  const stream = await model.stream(message); // stream is used for the giving the response in the chunks...

  let aimessage = "";
  for await (const chunk of stream) {
    aimessage += chunk.content;
    process.stdout.write(chunk.content);
  }

  message.push({ role: "assistant", content: aimessage });

  process.stdout.write("\n");
}
