import express from "express";
import { upload } from "../middleware/upload";
import { GetProducts, CreateProduct, DeleteProduct } from "../controllers/product";
import { AuthenticateAdmin } from "../middleware/AdminAuth";
import { VerifySuperAdmin } from "../middleware/VerifyIsSuperAdmin";

const router = express.Router();

router.get("/", GetProducts);
router.post("/", AuthenticateAdmin, upload.single("thumbnail"), CreateProduct);
router.delete("/", AuthenticateAdmin, DeleteProduct);

export default router;