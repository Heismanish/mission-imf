import express, { json, Request, Response } from "express";
import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import gadgetsRoutes from "./routes/gadgets.route.js";

const PORT = process.env.PORT || 3000;
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
app.use("/api/gadgets", gadgetsRoutes);

const documentLink =
  "https://documenter.getpostman.com/view/29128305/2sAYX6p27J";

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h1 style="color: red; font-size: 45px; font-family: sans-serif; margin-bottom: 10px;">
  Hello, this is IMF!!
</h1>
<a href="${documentLink}" target="_blank" style="font-size: 18px; color: blue; text-decoration: underline;">
  📄 Docs here...
</a>
`
  );
});

app.listen(PORT, () => {
  console.log(`IMF app listening on port ${PORT}`);
});
