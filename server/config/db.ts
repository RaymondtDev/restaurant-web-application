import { connect } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await connect(MONGO_URI);
    console.log("Successfully connected to Database.");
  } catch (error) {
    console.error("An Error Occurred When Connecting To Database:", error);
    process.exit(1);
  }
}