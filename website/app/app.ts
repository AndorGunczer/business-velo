// src/index.ts
import path from 'path';
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Serve static files from the `src` folder
app.use(express.static(path.join(__dirname, 'src')));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/tex-mex-abend", (req: Request, res: Response) => {
  res.render('tex-mex.ejs');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
