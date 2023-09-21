import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors';

import indexRouter from "./routes/index.js";
import errorHandler from './middlewares/error.middleware.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  exposedHeaders: ['Authorization'],
}));



app.get("/", (req, res) => {
  return res.json({ message: "환영 합니당!@." });
});

app.use("/api", [indexRouter]);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${PORT}포트 연결!`);
});
