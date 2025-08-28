import React, { useState } from "react";

const AddCardForm = ({ listId, onAdd, onCancel }) => {
  const [cardData, setCardData] = useState({ title: "", description: "" });

  const handleSubmit = () => {
    if (cardData.title.trim()) {
      onAdd(listId, cardData);
      setCardData({ title: "", description: "" });
      onCancel();
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 ">
      <input
        type="text"
        placeholder="Enter task title..."
        value={cardData.title}
        onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
        className="w-full p-2 border border-gray-200 rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        autoFocus
      />
      <textarea
        placeholder="Enter description (optional)..."
        value={cardData.description}
        onChange={(e) =>
          setCardData({ ...cardData, description: e.target.value })
        }
        className="w-full p-2 border border-gray-200 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={2}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
