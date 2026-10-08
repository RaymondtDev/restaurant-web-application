import { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

interface UserType {
  name: string,
  surname: string,
  username: string,
  email: string,
  phone: string,
  passwordHash: string,
  reservations: string[],
  cart: string[],
  orderHistory: string[]
}

interface UserMethods {
  setPassword: (password: string) => Promise<void>,
  validatePassword: (password: string) => Promise<boolean>
}

type UserDocument = UserType & UserMethods;

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

// schema method to set passwordHash
UserSchema.methods.setPassword = async function (password: string): Promise<void> {
  const saltRounds = 10;
  this.passwordHash = await bcrypt.hash(password, saltRounds);
};

// schema method to validate password
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = new Model("User", UserSchema);
export default User;