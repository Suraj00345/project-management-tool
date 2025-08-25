import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormCard from "./FormCard";
import { useRegistrationStore } from "../../store/useRegisrationStore";
import toast from "react-hot-toast";
import { resendAccountVerification, verifyEmail } from "../../utils/api-client";
import { useAuthStore } from "../../store/useAuthStore";
import SubmitButton from "./SubmitButton";

const VerificationForm = () => {
  const { reset, email } = useRegistrationStore((state) => state);
  const { login } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      // Simulate API call
      const response = await verifyEmail(email, data.verificationCode);

      if (response.token) {
        toast.success("Verification successful!");
        login(response.user, response.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error.message || "Verification failed");
    }
  };

  const onResendCode = async () => {
    try {
      const response = await resendAccountVerification(email);
      console.log(response);
      toast.success("Verification code resent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to resend verification code");
    }
  };

  return (
    <FormCard title="Verify your account">
      <div>
        <p className="text-gray-600 text-sm text-center">
          A verification code has been sent to your email. Please enter the code to verify your account. If you want to change your email,
          <button type="button" onClick={reset} className="text-blue-500 hover:text-blue-600 font-medium mx-1 cursor-pointer hover:underline">
            click here
          </button>
          to go back.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 space-y-4">
          {/* Verification Code Field */}
          <div>
            <input
              type="text"
              className="auth-input"
              placeholder="Verification Code"
              maxLength={6}
              {...register("verificationCode", {
                required: "Verification Code is required",
                minLength: { value: 6, message: "At least 6 characters needed" },
                maxLength: { value: 6, message: "At most 6 characters allowed" },
              })}
            />

            {errors.verificationCode && <span className="text-red-500 text-sm">{errors.verificationCode.message}</span>}
          </div>

          <SubmitButton isSubmitting={isSubmitting} buttonText="Verify" loadingText="Verifying..." type="submit" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{" "}
            <button type="button" onClick={onResendCode} className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium">
              Resend
            </button>
          </p>
        </div>
      </form>
    </FormCard>
  );
};

export default VerificationForm;
