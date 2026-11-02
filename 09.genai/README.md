# Generative AI with Node.js

## What I Learned

In this practice, I learned how to connect a Large Language Model (LLM) with Node.js using **LangChain and Groq API**.

### Key Concepts

- **Groq API:** Connect Node.js applications with an AI model.
- **LangChain:** Use `ChatGroq` to interact with an LLM.
- **Environment Variables:** Securely store API keys using `dotenv`.
- **User Input:** Accept input from the terminal using `readline`.
- **Streaming:** Generate AI responses in small chunks instead of waiting for the complete response.
- **Async Iteration:** Use `for await...of` to process streamed responses.

### Important Code

```js
const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const stream = await model.stream([{ role: "user", content: userInput }]);

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

### Technologies Used

- Node.js
- JavaScript (ES Modules)
- LangChain
- Groq API
- dotenv

### Key Takeaway

Learned how to build a basic terminal-based AI chatbot and stream responses from an LLM using Node.js and LangChain.
