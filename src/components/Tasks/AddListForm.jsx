import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { createListApi } from "../../utils/api-client";

const AddListForm = ({ onAdd, onCancel, count }) => {
  const { projectId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const list = await createListApi(projectId, data.title, data.description, count + 1);
      onAdd(list);
      toast.success("List added successfully");
      onCancel();
    } catch (error) {
      toast.error(error.message || "Failed to add list");
    }
  };

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

      <div className="mt-2">
        <textarea
          placeholder="Enter list description..."
          {...register("description")}
          className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-36"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer">
          Add List
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddListForm;
