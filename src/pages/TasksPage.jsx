import React, { useState } from "react";
import { Plus } from "lucide-react";
import BoardHeader from "../components/Tasks/BoardHeader";
import List from "../components/Tasks/List";
import AddListForm from "../components/Tasks/AddListForm";

const listData = [
  {
    id: "1",
    title: "To Do",
    cards: [
      {
        id: "1",
        title: "Plan project structure",
        description: "Create initial wireframes and architecture",
      },
      {
        id: "2",
        title: "Setup development environment",
        description: "Install dependencies and configure tools",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    cards: [
      {
        id: "3",
        title: "Design UI components",
        description: "Create reusable components for the application",
      },
    ],
  },
  {
    id: "3",
    title: "Done",
    cards: [
      {
        id: "4",
        title: "Initial research",
        description: "Research technologies and best practices",
      },
    ],
  },
];

const TaskPage = () => {
  const [lists, setLists] = useState(listData);

  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [isAddingList, setIsAddingList] = useState(false);

  // List Management Functions
  const addList = (title) => {
    const newList = {
      id: Date.now().toString(),
      title: title,
      cards: [],
    };
    setLists([...lists, newList]);
  };

  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
  };

  // Card Management Functions
  const addCard = (listId, newCard) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
      )
    );
  };

  const deleteCard = (listId, cardId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
          : list
      )
    );
  };

  const updateCard = (listId, cardId, updatedCard) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, ...updatedCard } : card
              ),
            }
          : list
      )
    );
  };

  // Drag and Drop Functions
  const handleDragStart = (e, card, sourceListId) => {
    setDraggedCard({ card, sourceListId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, listId) => {
    e.preventDefault();
    setDraggedOver(listId);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, targetListId) => {
    e.preventDefault();

    if (draggedCard && draggedCard.sourceListId !== targetListId) {
      // Remove card from source list and add to target list
      setLists(
        lists.map((list) => {
          if (list.id === draggedCard.sourceListId) {
            return {
              ...list,
              cards: list.cards.filter(
                (card) => card.id !== draggedCard.card.id
              ),
            };
          }
          if (list.id === targetListId) {
            return { ...list, cards: [...list.cards, draggedCard.card] };
          }
          return list;
        })
      );
    }

    setDraggedCard(null);
    setDraggedOver(null);
  };

  return (
    <div className=" bg-gray-200 overflow-x-auto h-screen">
      <div className="flex flex-col h-full min-w-max">
        <div className="p-6 pb-0">
          {/* enter project name here */}
          <BoardHeader Name={"Project Name"} />
        </div>
        <div className="flex gap-6 p-6 pt-0">
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onDeleteList={deleteList}
              onAddCard={addCard}
              onDeleteCard={deleteCard}
              onUpdateCard={updateCard}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              isDraggedOver={draggedOver === list.id}
            />
          ))}

          {/* Add New List Section */}
          {isAddingList ? (
            <AddListForm
              onAdd={addList}
              onCancel={() => setIsAddingList(false)}
            />
          ) : (
            <button
              onClick={() => setIsAddingList(true)}
              className="h-20 bg-gray-300 text-black rounded-lg p-4 w-80 flex-shrink-0 flex items-center justify-center gap-2 hover:bg-opacity-30 transition-all border-opacity-50"
            >
              <Plus size={20} />
              Add another list
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
