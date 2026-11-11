import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { createInterface } from "readline";

dotenv.config();

// Select Model
const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

// Allow user to write prompt
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (true) {
  const userInput = await readline.question("Enter Prompt");

  const stream = await model.stream([{ role: "user", content: userInput }]);

  for await (const chunk of stream) {
    process.stdout.write(chunk.content);
  }

  process.stdout.write("\n");
}

readline.close();
