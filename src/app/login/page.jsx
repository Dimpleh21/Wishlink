"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save user info with custom id and name
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data.user.id, name: data.user.name })
      );

      // Redirect to dashboard after successful login
      router.push("/Dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md px-6 border border-gray-300 rounded-lg shadow-2xs bg-white p-10">
        <h1 className="font-[Raleway] text-4xl text-center mb-6">Login</h1>
        <form
          className="flex flex-col gap-4 font-[Raleway]"
          onSubmit={handleLogin}
        >
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
          <button
            type="submit"
            className="text-black p-2 rounded"
            style={{
              backgroundColor: "#cdb7ce",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
