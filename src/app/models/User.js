import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userId: { type: Number, unique: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishRoom" }], // Reference to wishrooms
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
const productSchema = new mongoose.Schema({
  title: String,
  price: { type: Number, required: false },
  image: { type: String, required: false },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
const wishRoomSchema = new mongoose.Schema({
  roomId: { type: Number, unique: true },
  title: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: [],
    },
  ],
});

export const WishRoom =
  mongoose.models.WishRoom || mongoose.model("WishRoom", wishRoomSchema);
// models/Product.js
