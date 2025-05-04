import { connectDB } from "@/app/utils/connect";
import { User } from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const users = await User.find({ _id: { $ne: id } });

    return NextResponse.json({ members: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { message: "Database error: " + error.message },
      { status: 500 }
    );
  }
}
