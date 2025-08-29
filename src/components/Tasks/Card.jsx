import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useOpen from "../../hooks/useOpen";
import EditCardForm from "./EditCardForm";
import TaskMenu from "./TaskMenu";

const Card = ({ card, onDelete, onUpdate }) => {
  const { isOpen: isEditing, open: startEditing, close: stopEditing } = useOpen();

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

  if (isEditing) return <EditCardForm task={card} onUpdate={onUpdate} onClose={stopEditing} />;

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`bg-white p-3 rounded-lg shadow-sm border border-gray-200  hover:shadow-md transition-shadow group relative ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 cursor-move" {...attributes} {...listeners}>
          <h4 className="font-medium text-gray-800 mb-1">{card.title}</h4>
          {card.description && <p className="text-sm text-gray-600">{card.description}</p>}
        </div>

        <TaskMenu onEnableEdit={startEditing} onDelete={onDelete} cardId={card._id} />
      </div>
    </div>
  );
};

export default Card;
