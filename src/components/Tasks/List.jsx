import { useMemo, useState } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";
import { GripVertical, Maximize2, Minimize2, Plus, Trash2 } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// List Component
const List = ({ list, tasks, onDeleteList, onAddCard, onDeleteCard, onUpdateCard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const cardIds = useMemo(() => list.cards?.map((card) => card._id) || [], [list.cards]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: list._id,

    data: {
      type: "list",
      list,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString({ ...transform, scaleX: 1, scaleY: 1 }),
  };

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
      <div className={`bg-gray-100 rounded-lg p-4 flex-shrink-0 w-16 h-80 flex flex-col items-center justify-start `}>
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
          <h3 className="font-semibold text-gray-800 text-sm whitespace-nowrap transform -rotate-90 origin-center ">{list.title}</h3>
        </div>

        {/* Card Count */}
        <div className="text-xs text-gray-500 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">{list.cards?.length || 0}</div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={`bg-gray-100 rounded-lg p-4 flex-shrink-0 w-80 h-fit ${isDragging ? "opacity-50" : ""}`}>
      {/* List Header */}
      <div className="flex items-center justify-between mb-4 w-full">
        <button {...attributes} {...listeners} className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-move">
          <GripVertical />
        </button>

        <h3 className="font-semibold text-gray-800 text-base flex-1 ">{list.title}</h3>

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
      <SortableContext items={cardIds}>
        <div className="flex flex-col gap-3 mb-4">
          {tasks?.map((card, index) => (
            <Card key={card._id} card={card} listId={card.listId} onDelete={onDeleteCard} onUpdate={onUpdateCard} index={index} />
          ))}
        </div>

        {/* Add Card Section */}
        {isAddingCard ? (
          <AddCardForm listId={list._id} onAdd={handleAddCard} onCancel={() => setIsAddingCard(false)} order={list.cards.length + 1} />
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors border-2 border-dashed border-gray-300 hover:border-gray-400"
          >
            <Plus size={16} />
            Add a task
          </button>
        )}
      </SortableContext>
    </div>
  );
};

export default List;
