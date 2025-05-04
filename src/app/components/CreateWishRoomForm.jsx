"use client";
import { useState } from "react";

export default function CreateWishRoomForm({ members, userId, closeForm }) {
  const [roomName, setRoomName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleMemberChange = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wishRoomData = {
      title: roomName, // Ensure 'title' is correctly used for the backend
      createdBy: userId,
      members: selectedMembers,
    };

    console.log("Submitting wish room data:", wishRoomData); // Log the data

    try {
      const res = await fetch("/api/wishrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishRoomData),
      });

      if (res.ok) {
        alert("Wish room created successfully!");
        closeForm(); // Close the form
      } else {
        alert("Failed to create wish room.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error creating wish room.");
    }
  };

  return (
    <div className="p-6 bg-[#b3a0b4] rounded shadow-md w-[800px]">
      <h2 className="text-xl mb-4">Create a New Wish Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Room Name</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Select Members</label>
          <div>
            {members.map((member) => (
              <div key={member._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={member._id}
                  value={member._id}
                  checked={selectedMembers.includes(member._id)}
                  onChange={() => handleMemberChange(member._id)}
                />
                <label htmlFor={member._id} className="ml-2">
                  {member.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-black text-white p-2 rounded cursor-pointer"
            onClick={closeForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-white text-[#796b79] p-2 rounded border border-[#524753] cursor-pointer"
          >
            Create Wish Room
          </button>
        </div>
      </form>
    </div>
  );
}
