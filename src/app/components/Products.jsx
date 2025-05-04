"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Wishlist({ roomId, onAddProduct }) {
  const [products, setProducts] = useState([]);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProduct = (product) => {
    axios
      .post(`/api/wishrooms/${roomId}`, { product })
      .then((response) => {
        console.log("Product added to room:", response.data);
        onAddProduct(response.data.room);
        setAddedSuccessfully(true); // Show joy message
        setTimeout(() => setAddedSuccessfully(false), 5000); // Auto-hide after 5 sec
      })
      .catch((error) => {
        console.error("Error adding product to room:", error);
      });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-[Raleway] text-center mb-6">Products</h1>

      {addedSuccessfully && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg shadow flex flex-col items-center">
          <p className="text-lg font-semibold mb-2">
            🎉 Product added successfully!
          </p>
          <button
            onClick={() => router.push(`/wishroom/${roomId}`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Visit Wishroom
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-xl font-bold mt-2">${product.price}</p>
              <button
                onClick={() => handleAddProduct(product)}
                className="mt-4 bg-[#cdb7ce] text-white border-black p-2 rounded cursor-pointer"
              >
                Add to Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
