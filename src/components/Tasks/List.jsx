import React, { useState } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";
import { Maximize2, Minimize2, Plus, Trash2 } from "lucide-react";

// List Component
const List = ({ list, onDeleteList, onAddCard, onDeleteCard, onUpdateCard, onDragStart, onDragOver, onDragLeave, onDrop, isDraggedOver }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddCard = (listId, cardData) => {
    const newCard = {
      id: Date.now().toString(),
      title: cardData.title,
      description: cardData.description,
    };
    onAddCard(listId, newCard);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isAddingCard) {
      setIsAddingCard(false);
    }
  };

  if (isCollapsed) {
    return (
      <div
        className={`bg-gray-100 rounded-lg p-4 flex-shrink-0 w-16 h-80 flex flex-col items-center justify-start ${
          isDraggedOver ? "ring-2 ring-blue-400 bg-blue-50" : ""
        }`}
        onDragOver={(e) => onDragOver(e, list._id)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, list._id)}
      >
        {/* Collapsed Header */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <button onClick={toggleCollapse} className="text-gray-600 hover:text-gray-800 p-1 rounded">
            <Maximize2 size={16} className="rotate-180" />
          </button>
          <button onClick={() => onDeleteList(list._id)} className="text-gray-500 hover:text-red-500 p-1 rounded">
            <Trash2 size={14} />
          </button>
        </div>

        {/* Rotated Title */}
        <div className="flex-1 flex items-center justify-center">
          <h3 className="font-semibold text-gray-800 text-sm whitespace-nowrap transform -rotate-90 origin-center">{list.title}</h3>
        </div>

        {/* Card Count */}
        <div className="text-xs text-gray-500 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">{list.cards?.length || 0}</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-100 rounded-lg p-4 flex-shrink-0 w-80 h-fit ${isDraggedOver ? "ring-2 ring-blue-400 bg-blue-50" : ""}`}
      onDragOver={(e) => onDragOver(e, list._id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, list._id)}
    >
      {/* List Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">{list.title}</h3>
        <div className="flex items-center gap-1">
          <button onClick={toggleCollapse} className="text-gray-500 hover:text-gray-700 p-1 rounded">
            <Minimize2 size={16} />
          </button>

          <button onClick={() => onDeleteList(list._id)} className="text-gray-500 hover:text-red-500 p-1 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Cards Container - Dynamic Height */}
      {/* <div className="space-y-3 mb-4">
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            listId={list.id}
            onDelete={onDeleteCard}
            onUpdate={onUpdateCard}
            onDragStart={onDragStart}
          />
        ))}
      </div> */}

      {/* Add Card Section */}
      {isAddingCard ? (
        <AddCardForm listId={list._id} onAdd={handleAddCard} onCancel={() => setIsAddingCard(false)} />
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors border-2 border-dashed border-gray-300 hover:border-gray-400"
        >
          <Plus size={16} />
          Add a task
        </button>
      )}
    </div>
  );
};

export default List;
