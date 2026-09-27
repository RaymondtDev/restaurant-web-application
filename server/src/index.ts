import "dotenv/config";
import express, { Response, Request } from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Welcome to the Restaurant Web Application</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});