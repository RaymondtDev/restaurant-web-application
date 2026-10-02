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

export const GetProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("An Error Occurred When Fetching Products:", error);
    res.status(500).json({ message: "Product fetching server error", error: error });
  }
}

export const DeleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params as { productId: string };
  try {
    const product = await Product.findById(productId);

    // check if product exists
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // delete product thumbnail from cloudinary
    await cloudinary.uploader.destroy(product.thumbnail.publicId);
    await product.deleteOne(); // delete product from database

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("An Error Occurred When Deleting Product:", error);
    res.status(500).json({ message: "Product deletion server error", error: error });
  }
}