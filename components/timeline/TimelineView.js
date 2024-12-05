"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import TimelineEntry from "./TimelineEntry";
import AddMemoryModal from "./AddMemoryModal";

const TimelineView = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      const response = await apiClient.get("/api/timeline");
      setEntries(response.data.entries);
    } catch (error) {
      console.error("Failed to fetch timeline entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      try {
        await apiClient.delete(`/api/timeline/${entryId}`);
        await fetchEntries(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete entry:", error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingEntry) {
        await apiClient.put(`/api/timeline/${editingEntry._id}`, formData);
      } else {
        await apiClient.post("/api/timeline", formData);
      }
      await fetchEntries();
      setEditingEntry(null);
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading your amazing life story... ✨</div>;
  }

  return (
    <div className="relative">
      <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-primary/20" />

      {entries.map((entry) => (
        <TimelineEntry
          key={entry._id}
          entry={entry}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <AddMemoryModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        onSubmit={handleSubmit}
        editEntry={editingEntry}
      />
    </div>
  );
};

export default TimelineView;