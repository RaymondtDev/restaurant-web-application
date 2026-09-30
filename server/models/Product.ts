import { Schema, model } from "mongoose";

interface ProductType {
  title: string,
  description: string,
  price: number,
  thumbnail: {
    url: string,
    publicId: string
  },
  category: string,
  createdAt: Date
}

const ProductSchema = new Schema<ProductType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  category: {
    type: String,
    enum: [ 'steaks', 'burgers', 'sides', 'drinks' ],
    required: true
  },
  createdAt: { type: Date, default: Date.now() }
});

const Product = model<ProductType>("Product", ProductSchema);
export default Product;