import express from "express";
import { CheckUser, CreateUser, GetUsers, UserLogin, UserLogout } from "../controllers/user";
import { UserAuthentication } from "../middleware/UserAuth";
import { AuthenticateAdmin } from "../middleware/AdminAuth";

const router = express.Router();

router.post("/", CreateUser);
router.get("/", AuthenticateAdmin, GetUsers);
router.get("/check", CheckUser);
router.post("/login", UserLogin);
router.post("/logout", UserAuthentication, UserLogout);

export default router;