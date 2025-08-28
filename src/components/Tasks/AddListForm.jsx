import React, { useState } from "react";

const AddListForm = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle("");
      onCancel();
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 min-w-80 max-w-80 h-fit">
      <input
        type="text"
        placeholder="Enter list title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add List
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddListForm;
