import express, { Router } from "express";
import { AuthenticateAdmin } from "../middleware/AdminAuth";
import { CheckAdmin, CreateAdmin, LoginAdmin, LogoutAdmin } from "../controllers/admin";

const router: Router = express.Router();

router.post("/", CreateAdmin);
router.get("/check", CheckAdmin);
router.post("/login", LoginAdmin);
router.post("/logout", AuthenticateAdmin, LogoutAdmin);

export default router;