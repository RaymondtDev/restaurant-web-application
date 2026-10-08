import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import JWT from "jsonwebtoken";
import { USER_ACCESS_TOKEN_SECRET_KEY } from "../config/jwt";
import { UserPayload } from "../types/express";

export function UserAuthentication(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.userAccessToken; // get token from request cookies

  // if token is not found, return an error
  if (!token) return res.status(401).json({ success: false, message: "Access Denied: No token provided" });

  try {
    // verify jwt token and store payload in variable
    const decoded = JWT.verify(token, USER_ACCESS_TOKEN_SECRET_KEY) as UserPayload;

    // pass jwt token to user request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("User Authenticaton Error:", error);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
}