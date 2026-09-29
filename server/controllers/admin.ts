import { Request, Response } from "express";
import Admin from "../models/Admin";
import JWT from "jsonwebtoken";
import { ADMIN_ACCESS_TOKEN_SECRET_KEY, ADMIN_REFRESH_TOKEN_SECRET_KEY } from "../config/jwt";
import { AdminPayload } from "../types/express";

// controller for frontend admin refresh
export const CheckAdmin = (req: Request, res: Response) => {
  const accessToken = req.cookies?.adminAccessToken;
  const refreshToken = req.cookies?.adminRefreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No admin session found"
    });
  }

  if (accessToken) {
    const decoded = JWT.verify(accessToken, ADMIN_ACCESS_TOKEN_SECRET_KEY) as AdminPayload;

    req.admin = decoded;

    return res.status(200).json({ success: true, admin: decoded });
  }
  if (!refreshToken) return res.status(401).json({ success: false, message: "Session expired. Please log in again." });

  try {
    const decoded = JWT.verify(refreshToken, ADMIN_REFRESH_TOKEN_SECRET_KEY) as AdminPayload;

    const newAccessToken = JWT.sign(
      { id: decoded.id, username: decoded.username, isSuperAdmin: decoded.isSuperAdmin },
      ADMIN_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.cookie("adminAccessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    req.admin = decoded;

    res.status(200).json({ success: true, admin: decoded, accessTokenRefreshed: true });
  } catch (error) {
    console.error("An Error Occurred When Admin Refresh:", error);
    res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
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