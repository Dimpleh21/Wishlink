"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Wishlist from "../components/Products";
import Canvas from "../components/Canvas";

export default function RoomProductsPage() {
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // <== Add this

  useEffect(() => {
    const id = searchParams.get("roomId");
    if (id) setRoomId(id);
  }, [searchParams]);

  const handleAddProduct = async (product) => {
    try {
      const res = await fetch(`/api/wishrooms/${roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      console.log("Product added successfully to the room");
      setRefreshKey((prev) => prev + 1); // Trigger Canvas refresh
    } catch (error) {
      console.error("Error adding product to room:", error.message);
    }
  };

  if (!roomId) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Canvas roomId={roomId} refreshKey={refreshKey} /> {/* Pass refreshKey */}
      <Wishlist roomId={roomId} onAddProduct={handleAddProduct} />
    </div>
  );
}
