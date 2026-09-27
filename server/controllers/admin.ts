import { Request, Response } from "express";
import Admin from "../models/Admin";

// controller for frontend admin refresh
export const CheckAdmin = (req: Request, res: Response) => {
  try {
    // if admin not in request headers, return error
    if (!req.admin) return res.status(404).json({ success: false, message: "Admin Not Found" });

    // send admin info on successful refresh
    return res.status(200).json({ success: true, admin: req.admin });
    
  } catch (error) {
    console.error("An Error Occurred When Validating Admin:", error);
    return res.status(500).json({ message: "Check Admin Server Error", error });
  }
}

// create admin controller
export const CreateAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string, password: string };

  try {
    // return error if fields are empty on submition
    if (!username) return res.status(400).json({ message: "Username required" });
    if (!password) return res.status(400).json({ message: "Password required" });

    const admin = new Admin({ username });
    await admin.setPassword(password);

    await admin.save(); // save created admin to database

    return res.status(201).json({ succcess: true, message: "Admin successfully created" });

  } catch (error) {
    console.error("An Error Occurred When Creating Admin:", error);
    return res.status(500).json({ message: "Create Admin Server Error", error });
  }
}

// admin login controller
export const LoginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string, password: string };

  try {
    // return error if fields are empty on submition
    if (!username) return res.status(400).json({ message: "Username required" });
    if (!password) return res.status(400).json({ message: "Password required" });

    const admin = await Admin.findOne({ username });
    
    // check if admin exists
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const validatedPass = admin.validatePassword(password);

    // check if password is correct
    if (!validatedPass) return res.status(401).json({ success: false, message: "Invalid username or password" });

    return res.status(200).json({ success: true, message: "Admin logged in successfully" })
  } catch (error) {
    
  }
}