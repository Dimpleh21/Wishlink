"use client";
import { useEffect, useState } from "react";

export default function Canvas({ roomId, refreshKey }) {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    fetch(`/api/wishrooms/${roomId}`)
      .then((res) => res.json())
      .then((data) => setRoomData(data.room))
      .catch((err) => console.error("Fetch error:", err));
  }, [roomId, refreshKey]); // Trigger reload on key change

  if (!roomData) {
    return <div>Loading room data...</div>;
  }

  return (
    <div className="p-6">
      {/* Members */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">👥 Members</h2>
        <div className="flex gap-3">
          {roomData.members?.map((member) => (
            <div
              key={member._id}
              className="w-12 h-12 bg-purple-300 text-white rounded-full flex items-center justify-center text-lg font-bold"
              title={member.name}
            >
              {member.name?.charAt(0).toUpperCase() || "U"}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Wishroom Products</h2>

        {roomData.products?.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {roomData.products.map((product) => (
              <div key={product._id} className="p-4 border rounded shadow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain mb-2"
                />
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
