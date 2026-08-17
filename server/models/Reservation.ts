import { Schema, Model } from "mongoose";

const ReservationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  table: { type: String, required: true },
  guests: { type: Number, required: true },
  timeSlot: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
});

const Reservation = new Model("Reservation", ReservationSchema);
export default Reservation;