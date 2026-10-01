import { Request, Response } from "express";
import Product from "../models/Product";
import { upload, cloudinary } from "../middleware/upload";

export const CreateProduct = async (req: Request, res: Response) => {
  const { title, description, price, category } = req.body as { title: string, description: string, price: number, category: string };

  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    // upload product thumbnail to cloudinary
    const result = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "restaurant/products" }
    );

    // create product in database
    const product = new Product({
      title,
      description,
      thumbnail: {
        url: result.secure_url,
        publicId: result.public_id
      },
      price,
      category
    });

    // save product in database
    await product.save();

    res.status(201).json({ success: true, message: "Product created successfully" });
  } catch (error) {
    console.error("An Error Occurred When Creating Product:", error);
    res.status(500).json({ message: "Product creation server error", error: error });
  }
}