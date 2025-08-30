import { useState } from "react";
import useOpen from "../../hooks/useOpen";
import toast from "react-hot-toast";
import { updateListApi } from "../../utils/api-client";
import { useParams } from "react-router-dom";

const ListTitle = ({ list, onEdit }) => {
  const [value, setValue] = useState(list.title);
  const { isOpen, open, close } = useOpen();
  const { projectId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateHandler = async () => {
    close();
    if (isSubmitting) return;

    if (value.trim() === "") {
      toast.error("List title cannot be empty");
      return setValue(list.title);
    }

    if (value === list.title) return;

    try {
      setIsSubmitting(true);
      const response = await updateListApi(projectId, list._id, value);
      if (response.error) {
        throw new Error(response.error);
      }
      onEdit(response);
      toast.success("List updated successfully");
      close();
    } catch (error) {
      toast.error(error.message || "Error updating list");
      setValue(list.title);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOpen) {
    return (
      <div className="font-semibold text-gray-800 text-base flex-1">
        <input
          disabled={isSubmitting}
          type="text"
          className="rounded-md p-1 w-full outline-none border border-gray-300 focus:ring-2 focus:ring-blue-400 
          "
          onChange={(e) => setValue(e.target.value)}
          value={value}
          autoFocus
          onBlur={updateHandler}
        />
      </div>
    );
  }

  return (
    <>
      <h3 onClick={open} title={list.title} className="cursor-text font-semibold p-1.5 text-gray-800 text-base flex-1 truncate">
        {list.title}
      </h3>
    </>
  );
};

export default ListTitle;
