import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AdminPayload {
  id: string,
  username: string,
  isSuperAdmin: boolean
}

export interface UserPayload {
  id: string,
  name: string,
  surname: string,
  username: string,
  cart: string[] | null
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload,
      user?: UserPayload
    }
  }
}

export {};