"use client";

import { useState } from "react";
import Modal from "@/components/Modal";

const AddMemoryModal = ({ isOpen, setIsOpen, onSubmit, editEntry = null }) => {
  const [formData, setFormData] = useState(editEntry || {
    title: "",
    description: "",
    date: "",
    category: "personal",
    isPublic: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={editEntry ? "Edit Memory" : "Add New Memory"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="label">Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.date?.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select 
            className="select select-bordered w-full"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="personal">Personal ❤️</option>
            <option value="work">Work 💼</option>
            <option value="education">Education 🎓</option>
            <option value="achievement">Achievement 🏆</option>
          </select>
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Make this memory public</span>
            <input
              type="checkbox"
              className="toggle"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          {editEntry ? "Save Changes" : "Add Memory"} 🌟
        </button>
      </form>
    </Modal>
  );
};

export default AddMemoryModal;