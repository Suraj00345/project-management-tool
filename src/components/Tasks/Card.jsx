import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ card, listId, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editData, setEditData] = useState({
    title: card.title,
    description: card.description,
  });

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: card._id,

    data: {
      type: "Task",
      task: card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString({ ...transform, scaleX: 1, scaleY: 1 }),
  };

  const dropdownRef = useRef(null);

  const handleSave = () => {
    if (editData.title.trim()) {
      onUpdate(listId, card._id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({ title: card.title, description: card.description });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    onDelete(listId, card._id);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (isEditing) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={2}
          placeholder="Enter description (optional)..."
        />

        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
            Update
          </button>
          <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded-lg shadow-sm border border-gray-200  hover:shadow-md transition-shadow group relative ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 mb-1">{card.title}</h4>
          {card.description && <p className="text-sm text-gray-600">{card.description}</p>}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
              <button onClick={handleEdit} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Edit3 size={14} />
                Edit
              </button>

              <button onClick={handleDelete} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
