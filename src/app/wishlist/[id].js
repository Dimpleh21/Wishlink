// pages/wishlist/[id].js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUsersExcludingCurrentUser } from "../../utils/actions";

export default function WishlistUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query; // Get the user ID from the URL

  useEffect(() => {
    // Fetch users excluding the current logged-in user
    if (id) {
      getUsersExcludingCurrentUser(id)
        .then((data) => {
          setUsers(data); // Set the users list
        })
        .catch((err) => {
          setError("Failed to load users");
          console.error(err);
        });
    }
  }, [id]);

  const handleSelectUser = (userId) => {
    // Handle user selection for wishlist room
    console.log(`User selected: ${userId}`);
    // You can store this selection or do something with it
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Select Users for Wishlist Room</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-4 border-b"
          >
            <span>{user.name}</span>
            <button
              onClick={() => handleSelectUser(user._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Room
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
