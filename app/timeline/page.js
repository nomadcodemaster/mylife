"use client";

import { useState } from "react";
import TimelineView from "@/components/timeline/TimelineView";
import AddMemoryModal from "@/components/timeline/AddMemoryModal";

export default function Timeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Life Timeline ⚡️</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Memory 🌟
        </button>
      </div>
      
      <TimelineView />
      <AddMemoryModal 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen}
      />
    </main>
  );
}