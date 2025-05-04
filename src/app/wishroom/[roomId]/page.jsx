"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function WishroomDetailsPage() {
  const { id: roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    axios
      .get(`/api/wishrooms/${roomId}`)
      .then((res) => {
        setRoomData(res.data.room); // Adjust this based on your backend structure
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load wishroom:", err);
        setLoading(false);
      });
  }, [roomId]);

  if (loading) return <p className="p-10 text-center">Loading wishroom...</p>;

  if (!roomData)
    return (
      <p className="p-10 text-center text-red-500">
        Could not find the wishroom.
      </p>
    );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎁 Wishroom Details
      </h1>

      {/* Members */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">👥 Members</h2>
        <ul className="list-disc pl-6">
          {roomData.members.map((member, index) => (
            <li key={index} className="text-lg">
              {member.name || `Member ${index + 1}`}
            </li>
          ))}
        </ul>
      </section>

      {/* Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🛍️ Products in the Room</h2>
        {roomData.products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomData.products.map((product, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="mt-2 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
