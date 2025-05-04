// utils/actions.js
import { connectDB } from "./connect";

export async function getUsersExcludingCurrentUser(currentUserId) {
  try {
    // Connect to MongoDB
    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Fetch all users excluding the current user by comparing their ID
    const users = await usersCollection
      .find({ _id: { $ne: currentUserId } })
      .toArray();

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
