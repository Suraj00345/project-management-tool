import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { updatePasswordApi } from "../../utils/api-client";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

function EyeButton({ showPassword, setShowPassword }) {
  return (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
}

const PasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const response = await updatePasswordApi(
        data.currentPassword,
        data.newPassword
      );
      if (!response) {
        throw new Error("Password update failed. Please try again.");
      }

      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.message || "An error occurred!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Helmet>
        <title>Update Password | My Account</title>
        <meta
          name="description"
          content="Manage your account settings and preferences."
        />
      </Helmet>

      <div className="flex items-center mb-6">
        <Lock className="text-blue-500 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("currentPassword", {
                required: "Current password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 6 characters long",
                },
                maxLength: {
                  value: 36,
                  message: "Password must be at most 36 characters long",
                },
              })}
              className={clsx(
                errors.currentPassword ? "auth-input-error" : "auth-input",
                "py-3 pr-12",
                "placeholder:text-base"
              )}
              placeholder="Enter current password"
            />
            <EyeButton
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          {errors.currentPassword && (
            <span className="mt-2 text-sm text-red-600">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 6 characters long",
                },
                maxLength: {
                  value: 36,
                  message: "Password must be at most 36 characters long",
                },
              })}
              className={clsx(
                errors.newPassword ? "auth-input-error" : "auth-input",
                "py-3 pr-12",
                "placeholder:text-base"
              )}
              placeholder="Enter new password"
            />
            <EyeButton
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>

          {errors.newPassword && (
            <span className="mt-2 text-sm text-red-600">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className={clsx(
                errors.confirmPassword ? "auth-input-error" : "auth-input",
                "py-3 pr-12",
                "placeholder:text-base"
              )}
              placeholder="Confirm new password"
            />
            <EyeButton
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          {errors.confirmPassword && (
            <span className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button disabled={isSubmitting} className="update-button">
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
