import Navbar from "@/app/components/Navbar";
import Chat from "./_components/chat";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <h1 className="text-2xl text-center font-bold mb-4"> Chat App</h1>
      <Chat />
    </div>
  );
}
