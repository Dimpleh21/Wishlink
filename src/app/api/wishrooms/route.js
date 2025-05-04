import { connectDB } from "@/app/utils/connect";
import { User, WishRoom } from "../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, createdBy, members } = body;

    if (!title || !members || !createdBy) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the current highest roomId and increment it by 1
    const lastRoom = await WishRoom.findOne().sort({ roomId: -1 });
    const newRoomId =
      lastRoom && typeof lastRoom.roomId === "number" ? lastRoom.roomId + 1 : 1;

    // Create the new wish room
    const newWishRoom = new WishRoom({
      roomId: newRoomId,
      title,
      createdBy,
      members,
      products: [], // Initialize with an empty array
    });

    const savedWishRoom = await newWishRoom.save();

    // Update all users to include this room ID in their `rooms` field
    const userIdsToUpdate = Array.from(new Set([...members, createdBy]));
    await User.updateMany(
      { _id: { $in: userIdsToUpdate } },
      { $addToSet: { rooms: savedWishRoom._id } }
    );

    return NextResponse.json(
      {
        message: "Wish room created successfully",
        wishRoom: savedWishRoom,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating wish room:", error);
    return NextResponse.json(
      { message: "Failed to create wish room", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const wishRooms = await WishRoom.find()
      .populate("members")
      .populate("createdBy");

    return NextResponse.json({ wishRooms });
  } catch (error) {
    console.error("Error fetching wish rooms:", error);
    return NextResponse.json(
      { message: "Failed to fetch wish rooms", error: error.message },
      { status: 500 }
    );
  }
}
