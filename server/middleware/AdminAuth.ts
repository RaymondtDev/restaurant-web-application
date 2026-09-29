import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { ADMIN_ACCESS_TOKEN_SECRET_KEY } from "../config/jwt";
import { AdminPayload } from "../types/express";

export function AuthenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.adminAccessToken;

  if (!token) return res.status(401).json({ success: false, message: "Access Denied: No token provided" });

  try {
    const decoded = JWT.verify(token, ADMIN_ACCESS_TOKEN_SECRET_KEY) as AdminPayload;

    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Admin Authenticaton Error:", error);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
}