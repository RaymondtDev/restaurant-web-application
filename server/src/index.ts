import "dotenv/config";
import express, { Response, Request } from "express";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import { connectDB } from "../config/db";
import adminRoutes from "../routes/admin";
import productRoutes from "../routes/product";
import userRoutes from "../routes/user";

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit to 100 request per 15-minute window
  message: "Too many request from this IP. Please try again later.",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("An Error Occurred When Connecting To Database:", error));