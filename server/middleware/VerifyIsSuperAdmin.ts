import { NextFunction, Request, Response } from "express";

export function VerifySuperAdmin(req: Request, res: Response, next: NextFunction) {
  const admin = req.admin;

  if (!admin?.isSuperAdmin) return res.status(403).json({ message: "Not Authorized For Action" });

  next();
}