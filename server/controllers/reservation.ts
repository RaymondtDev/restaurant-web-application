import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import { timeSlots } from "../utils/data";

interface ReservationType {
  user: string;
  table: {
    name: string;
    guests: number;
  };
  timeSlot: string;
  date: Date;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

export const checkAvailability = async (req: Request, res: Response) => {
  try {

    const { date, table } = req.body as { date: string; table: string };
    const reservations: ReservationType[] = await Reservation.find({ date, "table.name": table });

    const reservedSlots = reservations.map(reservation => reservation.timeSlot);
    const availableSlots = timeSlots.filter(slot => !reservedSlots.includes(slot));

    res.status(200).json({ availableSlots });
    
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const createResevation = async (req: Request, res: Response) => {
  try {
    const { userInfo, date, table, timeSlot } = req.body as {
      userInfo: {
        name: string;
        surname: string;
        email: string;
        phone: string;
        ocassion?: string;
        specialRequest?: string;
      },
      date: string;
      table: {
        name: string;
        guests: number;
      };
      timeSlot: string;
    }

    const newReservation = new Reservation({
      user: userInfo,
      table,
      timeSlot,
      date
    });

    await newReservation.save();
    res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}