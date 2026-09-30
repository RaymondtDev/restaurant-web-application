import "dotenv/config";
import express, { Response, Request } from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "../config/db";
import adminRoutes from "../routes/admin";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/admin", adminRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("An Error Occurred When Connecting To Database:", error));