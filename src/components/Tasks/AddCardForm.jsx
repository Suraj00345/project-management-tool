import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createTaskApi } from "../../utils/api-client";
import { useParams } from "react-router-dom";

const AddCardForm = ({ listId, onAdd, onCancel, order }) => {
  const { projectId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const task = await createTaskApi(projectId, listId, { ...data, order: order });
      console.log(task);
      toast.success("Task added successfully!");
      reset();
      onCancel();
    } catch (error) {
      toast.error(error.message || "Failed to add task. Please try again.");
    }
  };

  return (
    <form className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 " onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Enter task title..."
          className="w-full p-2 border border-gray-200 rounded  text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Title must be at least 3 characters" },
            maxLength: { value: 100, message: "Title must be at most 100 characters" },
          })}
        />
        {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
      </div>

      <div className="mt-2">
        <textarea
          placeholder="Enter description (optional)..."
          className="w-full p-2 border border-gray-200 rounded  text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          {...register("description", {
            maxLength: { value: 500, message: "Description must be at most 500 characters" },
          })}
          rows={3}
        />

        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
      </div>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
          Add Task
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCardForm;
