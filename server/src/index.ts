import "dotenv/config";
import express, { Response, Request } from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "../config/db";
import adminRoutes from "../routes/admin";
import productRoutes from "../routes/product";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/products", productRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("An Error Occurred When Connecting To Database:", error));