"use client";
import { useEffect, useState } from "react";
import Wishlist from "../components/Products";
import { useRouter } from "next/navigation";

export default function WishRooms() {
  const [wishRooms, setWishRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Router = useRouter();
  // Fetch all wish rooms when the component mounts
  useEffect(() => {
    const fetchWishRooms = async () => {
      try {
        const res = await fetch("/api/wishrooms"); // Adjust API route as needed
        const data = await res.json();

        if (res.ok) {
          setWishRooms(data.wishRooms);
        } else {
          setError(data.message || "Failed to fetch wish rooms");
        }
      } catch (err) {
        setError("Error fetching wish rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchWishRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#cdb7ce] p-6">
      <h1 className="text-2xl font-semibold mb-4 text-white">Wish Rooms</h1>
      {wishRooms.length === 0 ? (
        <p>No wish rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishRooms.map((room) => (
            <div
              key={room._id} // Unique key for the wish room
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">{room.title}</h2>
              <p className="text-gray-600">
                Created by: {room.createdBy?.name || "Unknown"}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold">Members:</h3>
                <div>
                  {room.members.map((member) => (
                    <div
                      key={member._id} // Unique key for each member
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span className="text-gray-700">{member.name}</span>
                      <span className="text-sm text-gray-500">
                        {member.email}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3">
                <button
                  className="bg-violet-300 p-3 cursor-pointer rounded-lg"
                  onClick={() => Router.push(`/products?roomId=${room._id}`)}
                  // Navigate to the products page for this wish room
                >
                  Add products
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
