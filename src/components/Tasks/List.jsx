import { useMemo } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";
import { GripVertical, Maximize2, Minimize2, Plus, Trash2 } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteListModal from "./DeleteListModal";
import ListTitle from "./LiisitTitle";
import useOpen from "../../hooks/useOpen";

const List = ({
  list,
  onEditList,
  onDeleteList,
  //
  tasks,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
}) => {
  const { isOpen: isCollapsed, toggle: toggleCollapse } = useOpen();

  const taskIds = useMemo(() => tasks.map((task) => task._id), [tasks]);

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

  if (isCollapsed) return <CollapsedList list={list} toggleCollapse={toggleCollapse} />;

  return (
    <div ref={setNodeRef} style={style} className={`bg-gray-100 rounded-lg p-4 flex-shrink-0 w-80 h-fit ${isDragging ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between mb-4 w-full">
        <button {...attributes} {...listeners} className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-move">
          <GripVertical />
        </button>

        <ListTitle list={list} onEdit={onEditList} />

        <div className="flex items-center gap-1">
          <button onClick={toggleCollapse} className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-pointer">
            <Minimize2 size={16} />
          </button>

          <DeleteListModal listId={list._id} onDelete={onDeleteList} />
        </div>
      </div>

      <SortableContext items={taskIds}>
        <div className="flex flex-col gap-3 mb-4">
          {tasks?.map((card, index) => (
            <Card key={card._id} card={card} listId={card.listId} onDelete={onDeleteCard} onUpdate={onUpdateCard} index={index} />
          ))}
        </div>

        <AddCardForm listId={list._id} onAdd={onAddCard} order={tasks.length + 1} />
      </SortableContext>
    </div>
  );
};

export default List;

function CollapsedList({ list, toggleCollapse }) {
  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 flex-shrink-0 w-16 h-80 flex flex-col items-center justify-start gap-4 hover:bg-gray-100 cursor-pointer`}
      onClick={toggleCollapse}
    >
      <div className="flex flex-col items-center">
        <button className="text-gray-600 hover:text-gray-800 p-1 rounded">
          <Maximize2 size={16} className="rotate-180" />
        </button>
      </div>

      <div className="flex-1 flex items-center truncate ">
        <h3
          title={list.title}
          className="font-semibold text-gray-800 text-sm whitespace-nowrap transform -rotate-90 origin-center  w-full text-start truncate text"
        >
          {list.title}
        </h3>
      </div>

      <div className="text-xs text-gray-500 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">{list.cards?.length || 0}</div>
    </div>
  );
}
