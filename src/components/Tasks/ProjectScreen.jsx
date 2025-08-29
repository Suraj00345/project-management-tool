import { useEffect, useMemo, useState } from "react";
import List from "./List";
import AddListForm from "./AddListForm";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "./Card";
import { reOrderListApi, reOrderTasksApi } from "../../utils/api-client";
import { useParams } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import toast from "react-hot-toast";

let allowReorder = false;

const ProjectScreen = ({ lists, setLists, tasks, setTasks }) => {
  const [activeList, setActiveList] = useState();
  const [activeCard, setActiveCard] = useState();
  const { projectId } = useParams();
  const listIds = useMemo(() => lists.map((list) => list._id), [lists]);
  const debouncedTasks = useDebounce(tasks, 1000);

  useEffect(() => {
    if (!allowReorder) {
      return;
    }

    const tasksByList = Object.entries(
      debouncedTasks.reduce((acc, task) => {
        const { listId } = task;
        if (!acc[listId]) {
          acc[listId] = { listId, tasks: [] };
        }

        acc[listId].tasks.push({
          _id: task._id,
          order: acc[listId].tasks.length + 1,
          listId: task.listId,
        });

        return acc;
      }, {})
    ).map(([, value]) => value);

    const orderedTasks = tasksByList.flatMap(({ tasks }) =>
      tasks.map((task) => ({
        ...task,
        order: task.order,
      }))
    );

    reOrderTasksApi(projectId, orderedTasks)
      .then(() => {})
      .catch(() => {
        toast.error("Error reordering tasks");
      })
      .finally(() => {
        allowReorder = false;
      });
  }, [debouncedTasks, projectId]);

  // List Management Functions
  const listAddHandler = (list) => {
    setLists([...lists, list]);
  };

  const updateListHandler = (updatedList) => {
    setLists((prevLists) => prevLists.map((list) => (list._id === updatedList._id ? updatedList : list)));
  };

  const deleteListHandler = (listId) => {
    const newList = lists.filter((list) => list._id !== listId);
    setLists(newList);
  };

  const reorderListHandler = async (newOrder) => {
    try {
      const ids = newOrder.map((list) => list._id);
      await reOrderListApi(projectId, ids);
    } catch (error) {
      toast.error(error.message || "Error reordering lists");
    }
  };

  // Card Management Functions
  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteCard = (cardId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== cardId));
  };

  const updateCard = (updatedCard) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedCard._id ? updatedCard : task)));
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
      reorderListHandler(newListOrder);

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

        const newOrder = arrayMove(tasks, activeIndex, overIndex);

        return newOrder;
      });
    }

    const isOverList = over.data.current?.type === "list";

    if (isActiveTask && isOverList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task._id === activeId);

        tasks[activeIndex].listId = overId;

        const newOrder = arrayMove(tasks, activeIndex, activeIndex);

        return newOrder;
      });
    }

    allowReorder = true;
  };

  return (
    <>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="flex  gap-6 p-6 w-full overflow-x-auto flex-1 ">
          <SortableContext items={listIds}>
            {lists.map((list) => (
              <List
                key={list._id}
                // List
                list={list}
                tasks={tasks.filter((task) => task.listId === list._id)}
                onDeleteList={deleteListHandler}
                onEditList={updateListHandler}
                // Card
                onAddCard={addTaskHandler}
                onDeleteCard={deleteCard}
                onUpdateCard={updateCard}
              />
            ))}
          </SortableContext>

          <AddListForm onAdd={listAddHandler} count={lists.length} />
        </div>

        {createPortal(
          <DragOverlay className="">
            {activeList ? (
              <List
                list={activeList}
                tasks={tasks.filter((task) => task.listId === activeList._id)}
                onDeleteList={() => {}}
                onAddCard={() => {}}
                onDeleteCard={() => {}}
                onUpdateCard={() => {}}
              />
            ) : null}
            {activeCard ? <Card card={activeCard} /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </>
  );
};

export default ProjectScreen;
