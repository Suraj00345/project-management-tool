import { useMemo, useState } from "react";
import List from "./List";
import AddListForm from "./AddListForm";
import { Plus } from "lucide-react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "./Card";

const ProjectScreen = ({ lists, setLists, tasks, setTasks }) => {
  const [isAddingList, setIsAddingList] = useState(false);
  const listIds = useMemo(() => lists.map((list) => list._id), [lists]);

  const [activeList, setActiveList] = useState();
  const [activeCard, setActiveCard] = useState();

  // List Management Functions
  const listAddHandler = (list) => {
    setIsAddingList(false);
    list.cards = [];
    setLists([...lists, list]);
  };

  const deleteListHandler = (listId) => {
    const newList = lists.filter((list) => list._id !== listId);
    setLists(newList);
  };

  // Card Management Functions
  const addCard = (listId, newCard) => {
    const targetedList = lists.find((list) => list._id === listId);

    // if targetedList does not have cards prop then add an empty array
    if (!targetedList.cards) {
      targetedList.cards = [];
    }

    // Add the new card to the targeted list
    targetedList.cards.push(newCard);

    setLists([...lists]);
  };

  const deleteCard = (listId, cardId) => {
    setLists(lists.map((list) => (list.id === listId ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) } : list)));
  };

  const updateCard = (listId, cardId, updatedCard) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) => (card.id === cardId ? { ...card, ...updatedCard } : card)),
            }
          : list
      )
    );
  };

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "list") {
      setActiveList(event.active.data.current.list);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveCard(event.active.data.current.task);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return null;
    }

    setLists((lists) => {
      const activeColIndex = lists.findIndex((list) => list._id === activeId);
      const overColIndex = lists.findIndex((list) => list._id === overId);
      const newListOrder = arrayMove(lists, activeColIndex, overColIndex);
      return newListOrder;
    });

    setActiveList(null);
    setActiveCard(null);
  };

  const onDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return null;
    }

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === activeId);
        const overIndex = tasks.findIndex((task) => task._id === overId);
        tasks[activeIndex].listId = tasks[overIndex].listId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverList = over.data.current?.type === "list";

    if (isActiveTask && isOverList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === activeId);

        tasks[activeIndex].listId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="flex  gap-6 p-6 w-full overflow-x-auto flex-1 ">
          <SortableContext items={listIds}>
            {lists.map((list) => (
              <List
                key={list._id}
                list={list}
                tasks={tasks.filter((task) => task.listId === list._id)}
                onDeleteList={deleteListHandler}
                onAddCard={addCard}
                onDeleteCard={deleteCard}
                onUpdateCard={updateCard}
              />
            ))}
          </SortableContext>

          {isAddingList ? (
            <AddListForm count={lists.length} onAdd={listAddHandler} onCancel={() => setIsAddingList(false)} />
          ) : (
            <button
              onClick={() => setIsAddingList(true)}
              className="cursor-pointer h-16 bg-gray-300 text-black rounded-lg p-4 w-72 flex-shrink-0 flex items-center justify-center gap-2 hover:bg-gray-300/80 transition-all"
            >
              <Plus size={20} />
              Add another list
            </button>
          )}
        </div>

        {createPortal(
          <DragOverlay className="">
            {activeList ? <List list={activeList} /> : null}
            {activeCard ? <Card card={activeCard} /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </>
  );
};

export default ProjectScreen;
