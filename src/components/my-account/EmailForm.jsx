import { useState } from "react";
import { Bell, Mail, Check } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { resendVerificationMailAPi, updateEmailApi, verifyEmailCodeApi } from "../../utils/api-client";

const EmailForm = () => {
  const user = useAuthStore((state) => state.user);
  const updateUserEmail = useAuthStore((state) => state.updateUserEmail);

  const [formMode, setFormMode] = useState("view");
  const [codeSession, setCodeSession] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },

    resetField,
  } = useForm({
    defaultValues: {
      email: user.email,
    },
  });

  const onEmailSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await updateEmailApi(data.email);

      if (!response.sessionId) {
        throw new Error("Failed to initiate email verification");
      }

      setCodeSession({
        id: response.sessionId,
        email: response.email,
      });

      setFormMode("verify");
      console.log(response);
    } catch (error) {
      toast.error(error.message || "Failed to send verification code. Please try again.");
    }
  };

  const onResendCode = async () => {
    try {
      const response = await resendVerificationMailAPi(codeSession.id);
      if (!response.sessionId) {
        throw new Error("Failed to resend verification code");
      }

      setCodeSession({
        id: response.sessionId,
        email: response.email,
      });

      toast.success("Verification code resent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to resend verification code. Please try again.");
    }
  };

  const verifyEmail = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await verifyEmailCodeApi(codeSession.id, data.code);
      if (!response.email) {
        throw new Error("Email verification failed");
      }

      setCodeSession(null);
      setFormMode("view");
      updateUserEmail(response.email);
      toast.success("Email verified successfully!");
      resetField("code", "");
    } catch (error) {
      toast.error(error.message || "Email verification failed. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Mail className="text-blue-500 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Email Verification</h2>
      </div>

      <div className="w-full">
        {formMode === "view" && (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <Mail className="text-gray-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-600">Current email address</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-green-600">
                    <Check size={20} className="mr-1" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setFormMode("edit")}
              className={clsx("cursor-pointer w-full  px-6 py-3 rounded-lg font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white")}
            >
              Edit Email Address
            </button>
          </>
        )}

        {formMode === "edit" && (
          <form onSubmit={handleSubmit(onEmailSubmit)} className="mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                className={clsx(errors.email ? "auth-input-error " : "auth-input ", "py-3")}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email Address is not valid",
                  },
                })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="">
              <p className="text-gray-500 mt-2 mb-4 text-sm">To verify your email address, we'll send a 6-digit verification code to your email.</p>

              <div className="flex flex-col items-center">
                <button disabled={isSubmitting} type="submit" className="update-button w-full">
                  {isSubmitting ? "Sending..." : "Send Verification Code"}
                </button>

                <button
                  onClick={setFormMode.bind(this, "view")}
                  type="button"
                  className="px-6 py-3 rounded-lg font-medium transition-colors text-sm disabled:bg-blue-400 hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {formMode === "verify" && codeSession && (
          <form onSubmit={handleSubmit(verifyEmail)} className="">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <Bell className="text-blue-500 mr-2" size={20} />
                <p className="text-blue-800 text-sm">Verification code sent to {codeSession.email}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-digit verification code</label>
              <input
                type="text"
                {...register("code", {
                  required: "Verification code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Verification code must be 6 digits",
                  },
                })}
                className={clsx(
                  errors.code ? "focus:ring-red-500 focus:border-red-500" : "focus:ring-blue-500 focus:border-blue-500",
                  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none text-center text-2xl font-mono tracking-widest"
                )}
                placeholder="000000"
                maxLength="6"
              />
            </div>

            <div className="space-y-3">
              <button
                disabled={isSubmitting}
                type="submit"
                className="cursor-pointer w-full bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? "Please Wait..." : "Verify Email"}
              </button>

              {/* paragraph with resend button */}
              <p className="text-gray-500 text-sm">
                Didn't receive the code?{" "}
                <button type="button" onClick={onResendCode} className="text-blue-500 hover:underline cursor-pointer">
                  Resend Code
                </button>{" "}
                or{" "}
                <button type="button" onClick={() => setFormMode("edit")} className="text-blue-500 hover:underline cursor-pointer">
                  Change Email
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
