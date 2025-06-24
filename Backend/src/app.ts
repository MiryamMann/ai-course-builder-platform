import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // כתובת הפרונט
  credentials: true, // אם את משתמשת ב־cookies
}));

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ message: "AI Learning Platform is up!" });
});

export default app;
