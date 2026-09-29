import { Request, Response } from "express";
import Admin from "../models/Admin";
import JWT from "jsonwebtoken";

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

    res.status(201).json({ succcess: true, message: "Admin successfully created" });

  } catch (error) {
    console.error("An Error Occurred When Creating Admin:", error);
    res.status(500).json({ message: "Create Admin Server Error", error });
  }
}

// admin login controller
export const LoginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string, password: string };
  const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET as string;
  const ADMIN_REFRESH_TOKEN_SECRET = process.env.ADMIN_REFRESH_TOKEN_SECRET as string;

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

    // generate access and refresh tokens
    const accessToken = JWT.sign(
      { id: admin._id, username: admin.username, isSuperAdmin: admin.isSuperAdmin },
      ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    const refreshToken = JWT.sign(
      { id: admin._id, username: admin.username, isSuperAdmin: admin.isSuperAdmin },
      ADMIN_REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    )

    // send tokens to cookies
    res.cookie("adminAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.cookie("adminRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ success: true, message: "Admin logged in successfully", admin: { id: admin._id, username: admin.username, isSuperAdmin: admin.isSuperAdmin } })
  } catch (error) {
    console.error("An Error Occurred When Admin Login:", error);
    res.status(500).json({ message: "Login Admin server error", error });
  }
}

export const LogoutAdmin = async (req: Request, res: Response) => {
  try {
    res.clearCookie("adminAccessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    res.clearCookie("adminRefreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("An Error Occurred When Admin Logout:", error);
    return res.status(500).json({ message: "Logout Admin server error", error });
  }
}