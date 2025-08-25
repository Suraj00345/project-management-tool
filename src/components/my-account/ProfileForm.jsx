import { Edit, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";
import clsx from "clsx";
import toast from "react-hot-toast";
import { updateProfileApi } from "../../utils/api-client";

const ProfileForm = ({ setActiveTab }) => {
  const user = useAuthStore((state) => state.user);
  const updateUserName = useAuthStore((state) => state.updateUserName);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await updateProfileApi(data.firstName, data.lastName);
      updateUserName(response.user.firstName, response.user.lastName);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Profile update failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex items-center mb-6">
        <User className="text-blue-500 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "First name must be at least 2 characters long" },
              maxLength: { value: 50, message: "First name must be at most 50 characters long" },
            })}
            className={clsx(errors.firstName ? "auth-input-error" : "auth-input", "py-3", "capitalize")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "Last name must be at least 2 characters long" },
              maxLength: { value: 50, message: "Last name must be at most 50 characters long" },
            })}
            className={clsx(errors.lastName ? "auth-input-error" : "auth-input", "py-3", "capitalize")}
          />
        </div>

        <div>
          <div className="flex justify-between items-center gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <button className="flex items-center gap-1 text-sm text-green-500 cursor-pointer" onClick={() => setActiveTab("EMAIL")}>
              <Edit className="text-green-500 ml-2 " size={16} />
              Edit Email
            </button>
          </div>
          <input readOnly disabled className="auth-input py-3" value={user?.email || ""} />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          disabled={isSubmitting}
          className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors w-40 text-sm"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
