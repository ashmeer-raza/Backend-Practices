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

while (true) {
  const userInpurt = await readline.question("Write Somethings: ");
  const stream = await model.stream([{ role: "user", content: userInpurt }]); // stream is used for the giving the response in the chunks...

  for await (const chunks of stream) {
    process.stdout.write(chunks.content);
  }

  process.stdout.write("\n");
}
