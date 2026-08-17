import { Schema, Model } from "mongoose";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnailUrl: { type: String, required: true },
  imageUrls: [{ type: String }],
  category: {
    type: String,
    enum: [ 'breakfast', 'starter', 'main', 'drink', 'side', 'extra', 'dessert' ],
    required: true
  },
});

const Product = new Model("Product", ProductSchema);
export default Product;