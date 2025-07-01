import React from "react";
import DevilsEye from "./GlobalCams";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 bg-gray-900 shadow-md text-center text-2xl font-bold">
        Devil's Eye 🌐 - Public Camera Viewer
      </header>
      <main className="h-[calc(100vh-64px)]">
        <DevilsEye />
      </main>
    </div>
  );
}