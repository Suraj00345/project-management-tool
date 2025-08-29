import { useState } from "react";
import List from "./List";
import AddListForm from "./AddListForm";
import { Plus } from "lucide-react";

const ProjectScreen = ({ lists, setLists }) => {
  const [isAddingList, setIsAddingList] = useState(false);

  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

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
              cards: list.cards.filter((card) => card.id !== draggedCard.card.id),
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
    <div className="flex gap-6 p-6  w-full overflow-x-auto flex-1">
      {lists.map((list) => (
        <List
          key={list._id}
          list={list}
          onDeleteList={deleteListHandler}
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
  );
};

export default ProjectScreen;
