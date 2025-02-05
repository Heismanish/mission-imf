import express, { json, Request, Response } from "express";
import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

app.use(json()); // parsing application/json
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL, // allow only requests from this origin
  methods: "GET,POST,PUT,DELETE,PATCH ", // allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // allow only these headers
  preflightContinue: false, // ignore preflight requests
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello agents!! ");
});

app.listen(3000, () => {
  console.log("IMF app listening on port 3000!");
});
