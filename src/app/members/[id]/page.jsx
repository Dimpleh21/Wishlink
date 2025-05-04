// pages/members/[id].js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IMG from "../../../../public/bg7.png"; // Corrected path to public folder asset
import Wishlist from "../../components/Products"; // Corrected path
import CreateWishRoomForm from "../../components/CreateWishRoomForm"; // Import the form component
import { Router } from "next/router";

export default function MembersPage() {
  const Router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(""); // Handle error state
  const [showCreateForm, setShowCreateForm] = useState(false);
  useEffect(() => {
    // Retrieve logged-in user's name and ID (assuming it's stored in localStorage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
      setUserId(parsedUser.id); // Store the logged-in user's ID
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch all members including the logged-in user from `/api/members/[id]`
      const fetchMembers = async () => {
        try {
          const res = await fetch(`/api/members/${userId}`); // Fetch members for the current logged-in user
          const data = await res.json();

          if (res.ok) {
            // Exclude the logged-in user from the members list
            const filteredMembers = data.members.filter(
              (member) => member._id !== userId
            );
            setMembers(filteredMembers);
            setLoading(false); // Stop loading when the data is fetched
          } else {
            setError("Failed to fetch members");
            setLoading(false); // Stop loading on error
          }
        } catch (err) {
          setError("Error fetching members");
          setLoading(false); // Stop loading on error
        }
      };

      fetchMembers();
    }
  }, [userId]); // Run when `userId` is updated

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  const toggleCreateForm = () => setShowCreateForm(!showCreateForm);

  return (
    <div className="bg-[#cdb7ce] h-screen">
      <div
        className="flex flex-col justify-center h-screen bg-cover bg-center bg-[#cdb7ce]"
        style={{ backgroundImage: `url(${IMG.src})` }}
      >
        <div className="w-[1200px] max-w-md px-6 border border-gray-300 rounded-lg shadow-2xl bg-white bg-opacity-70 p-10 ml-24">
          <h1 className="font-[Raleway] text-4xl mb-6">Hey {userName}!</h1>
          <p className="mb-4">Here are the other members of the app!</p>
          <h2 className="font-[Raleway] text-2xl mt-8 mb-4">Other Members</h2>
          <ul>
            {members.length > 0 ? (
              members.map((member) => (
                <li key={member._id} className="mb-2">
                  <p className="font-[Raleway]">{member.name}</p>
                  <p>{member.email}</p>
                </li>
              ))
            ) : (
              <p>No other members found.</p>
            )}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleCreateForm}
              className="bg-[#aa98ab] text-white p-2 rounded mt-4 cursor-pointer"
            >
              Create Wish Room
            </button>
            <button
              className="bg-[#aa98ab] text-white p-2 rounded mt-4"
              onClick={() => Router.push(`/wishroom`)}
            >
              View Your Wishrooms
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}{" "}
        </div>
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#cdb7ceb1]">
            <CreateWishRoomForm
              members={members}
              userId={userId}
              closeForm={toggleCreateForm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
