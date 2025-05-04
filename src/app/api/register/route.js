import { NextResponse } from "next/server";
import { connectDB } from "../../utils/connect"; // Adjust path as needed
import { User } from "../../models/User"; // Adjust path as needed

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    // Find the highest userId and increment
    const lastUser = await User.findOne().sort({ userId: -1 });
    const nextUserId = lastUser?.userId ? lastUser.userId + 1 : 1;

    const newUser = await User.create({
      name,
      email,
      password,
      userId: nextUserId,
    });

    return NextResponse.json(
      { message: "User created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Database error: " + error.message },
      { status: 500 }
    );
  }
}
