import { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isSuperAdmin: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: true },
});

// schema method to set passwordHash
AdminSchema.methods.setPassword = async function (password: string): Promise<void> {
  const saltRounds = 10;
  this.passwordHash = await bcrypt.hash(password, saltRounds);
};

// schema method to validate password
AdminSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.passwordHash);
};

const Admin = new Model("Admin", AdminSchema);
export default Admin;