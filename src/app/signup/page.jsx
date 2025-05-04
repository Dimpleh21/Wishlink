"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Simple validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          "User registered successfully! Redirecting to login..."
        );
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Error creating user: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md px-6 border border-gray-300 rounded-lg shadow-2xl bg-white p-10">
        <h1 className="font-[Raleway] text-4xl text-center mb-6">Sign Up</h1>
        <form
          className="flex flex-col gap-4 font-[Raleway]"
          onSubmit={handleSignUp}
        >
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center mt-2">{successMessage}</p>
          )}
          <button
            type="submit"
            className="text-black p-2 rounded"
            style={{
              backgroundColor: "#cdb7ce",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
}
