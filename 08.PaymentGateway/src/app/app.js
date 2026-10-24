import express from "express";
import morgan from "morgan"; // HTTP request logger middleware

const app = express();

app.use(express.json());
app.use(morgan("dev"));

export default app;
