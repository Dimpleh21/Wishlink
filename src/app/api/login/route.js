import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/connect";
import { User } from "../../models/User"; // Adjust the path as necessary

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Plain password check (for now)
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id, // ✅ Include your custom id
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { message: "Login failed", error: err.message },
      { status: 500 }
    );
  }
}
