import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import planRouter from "./routes/plan.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webBuildRoot = path.resolve(__dirname, "../../web/dist");
const webBuildIndex = path.join(webBuildRoot, "index.html");

app.use(cors());
app.use(express.json());

app.use("/api/plan", planRouter);

if (fs.existsSync(webBuildIndex)) {
  app.use(express.static(webBuildRoot));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }

    return res.sendFile(webBuildIndex);
  });
}

app.listen(port, () => {
  console.log(`Travel Planner AI running on http://localhost:${port}`);
});
