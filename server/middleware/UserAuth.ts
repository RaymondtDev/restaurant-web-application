import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import JWT from "jsonwebtoken";
import { USER_JWT_SECRET_KEY } from "../config/jwt";

export function UserAuthentication(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.userToken; // get token from request cookies

  // if token is not found, return an error
  if (!token) return res.status(401).json({ success: false, message: "Access Denied: No token provided" });

  try {
    // verify jwt token and store payload in variable
    const decoded: string | JwtPayload = JWT.verify(token, USER_JWT_SECRET_KEY);

    // pass jwt token to user request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("User Authenticaton Error:", error);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
}