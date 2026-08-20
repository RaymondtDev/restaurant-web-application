import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import { tables, timeSlots } from "../utils/data";

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}