import { Schema, Model } from "mongoose";

const ReservationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  table: {
    name: { 
      type: String,
      enum: ["A1", "A2", "A3", "B1", "B2", "B3"],
      required: true
    },
    guests: { type: Number, required: true }
  },
  timeSlot: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Reservation = new Model("Reservation", ReservationSchema);
export default Reservation;