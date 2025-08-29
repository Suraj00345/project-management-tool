import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { createListApi } from "../../utils/api-client";
import { useState } from "react";
import { Plus } from "lucide-react";

const AddListForm = ({ onAdd, count }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { projectId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const cancelHandler = () => {
    reset();
    setIsAdding(false);
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const list = await createListApi(projectId, data.title, data.description, count + 1);
      onAdd(list);
      toast.success("List added successfully");
      cancelHandler();
    } catch (error) {
      toast.error(error.message || "Failed to add list");
    }
  };

  if (isAdding) {
    return (
      <form className="bg-gray-100 rounded-lg p-4 min-w-80 max-w-80 h-fit" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Enter list title..."
            {...register("title", { required: "This field is required" })}
            className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer">
            Add List
          </button>
          <button type="button" onClick={cancelHandler} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="cursor-pointer h-16 bg-gray-300 text-black rounded-lg p-4 w-72 flex-shrink-0 flex items-center justify-center gap-2 hover:bg-gray-300/80 transition-all"
    >
      <Plus size={20} />
      {count === 0 ? "Create your first list" : "Add another list"}
    </button>
  );
};

export default AddListForm;
