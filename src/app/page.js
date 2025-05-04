import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import Landing from "@/app/components/Landing";
import { AuthProvider } from "./contexts/AuthContext";
export default function Home() {
  return (
    <div
      style={{ backgroundColor: "#cdb7ce", height: "400px" }}
      className="h-screen"
    >
      <Landing />
    </div>
  );
}
