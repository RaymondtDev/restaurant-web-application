import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AdminPayload {
  id: string,
  username: string,
  isSuperAdmin: boolean
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload,
      user?: string | JwtPayload
    }
  }
}

export {};