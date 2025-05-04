"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IMG from "../../../public/bg7.png";
import Wishlist from "../components/Products";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
      setUserId(parsedUser.id); // Ensure it's 'id' based on your login page
    }
  }, []);

  const navigateToWishRooms = () => {
    if (userId) {
      router.push(`/wishlist/${userId}`);
    }
  };

  const navigateToMembers = () => {
    if (userId) {
      router.push(`/members/${userId}`);
    }
  };

  return (
    <div className="bg-[#cdb7ce] h-screen">
      <div
        className="flex flex-col justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.src})` }}
      >
        <div className="w-[1200px] max-w-md px-6 border border-gray-300 rounded-lg shadow-2xl bg-white bg-opacity-70 p-10 ml-24">
          <h1 className="font-[Raleway] text-4xl mb-6">Hey {userName}!</h1>
          <p className="mb-4">
            Choose the appropriate option to add your members or add products!
          </p>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className="text-black p-2 rounded"
              style={{
                backgroundColor: "#cdb7ce",
                border: "none",
                cursor: "pointer",
              }}
              onClick={navigateToWishRooms}
            >
              View WishRooms
            </button>
            <button
              type="button"
              className="text-black p-2 rounded"
              style={{
                backgroundColor: "#cdb7ce",
                border: "none",
                cursor: "pointer",
              }}
              onClick={navigateToMembers}
            >
              View Members
            </button>
          </div>
        </div>
      </div>
      {/* <div className="bg-[#cdb7ce]">
        <Wishlist />
      </div> */}
    </div>
  );
}
