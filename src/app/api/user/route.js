import { getSession } from "next-auth/react"; // If you're using next-auth
import { connectDB } from "@/app/utils/connect"; // Your MongoDB connection function

// Export the GET handler for this route
export async function GET(req) {
  const session = await getSession({ req });

  // Check if session exists
  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  const { email } = session.user;

  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Find the user in the database
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Return the user data
    return new Response(JSON.stringify({ userId: user._id, name: user.name }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
