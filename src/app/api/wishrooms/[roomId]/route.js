import { connectDB } from "@/app/utils/connect";
import { WishRoom, Product } from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { roomId } = params;
  const { product } = await req.json();

  try {
    await connectDB();

    const room = await WishRoom.findOne({ _id: roomId });

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    if (!Array.isArray(room.products)) {
      room.products = [];
    }

    let existingProduct = await Product.findOne({
      title: product.title,
      price: product.price,
      image: product.image,
    });

    if (!existingProduct) {
      existingProduct = new Product({
        title: product.title,
        price: product.price,
        image: product.image,
      });
      await existingProduct.save();
    }

    if (!room.products.includes(existingProduct._id)) {
      room.products.push(existingProduct._id);
      await room.save();
    }

    return NextResponse.json(
      { message: "Product added to room", room },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to room:", error);
    return NextResponse.json(
      { message: "Failed to add product to room", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET request handler to fetch full wishroom details
export async function GET(req, { params }) {
  const { roomId } = params;

  try {
    await connectDB();

    const room = await WishRoom.findById(roomId)
      .populate("members", "name email") // Adjust fields as needed
      .populate("products"); // Populate full product details

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    console.error("Error fetching room details:", error);
    return NextResponse.json(
      { message: "Failed to fetch room", error: error.message },
      { status: 500 }
    );
  }
}
