import express from "express";
import authRoutes from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser()); // cookie-parser is an Express middleware used to read cookies sent by the browser and make them available in req.body

app.use("/api/auth", authRoutes);
export default app;
