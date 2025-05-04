"use client";
import Image from "next/image";
import IMG from "../../../public/sh1.jpg";
import { useRouter } from "next/navigation";
export default function Landing() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen ">
      <div className="mt-24 flex items-center justify-center gap-10 bg-white rounded-lg w-[80%] h-[400px] mx-auto ">
        <div className="p-12 max-w-md">
          {/* <h1 className="font-[Raleway] text-4xl mb-4">Hey Naman!</h1> */}
          <h2 className="font-[Raleway] text-3xl font-medium mb-6">
            Welcome to WishLink
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            A collaborative space to manage, share, and track wishlists
            effortlessly. Add products, invite friends, and stay aligned{" "}
            <span className="text-[#af9daf]">all in one place.</span>
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              className="text-white px-4 py-2 rounded"
              style={{
                backgroundColor: "#af9daf",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="text-[#af9daf] px-4 py-2 rounded border border-[#af9daf]"
              style={{
                cursor: "pointer",
              }}
              onClick={() => router.push("/login")}
            >
              Log In
            </button>
          </div>
        </div>
        <div>
          <Image
            src={IMG}
            alt="WishLink Visual"
            className="w-[400px] h-[370px] object-cover rounded-lg ml-14 mt-6"
          />
        </div>
      </div>
    </div>
  );
}
