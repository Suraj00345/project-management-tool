import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormCard from "./FormCard";
import { useRegistrationStore } from "../../store/useRegisrationStore";
import { registerAPI } from "../../utils/api-client";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

const SignUpForm = () => {
  const { setRegistrationData, setVerify } = useRegistrationStore((state) => state);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const response = await registerAPI(data);
      if (response.email && response.id) {
        setRegistrationData(response.email, response.id);
        setVerify();
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <FormCard title="Create your account">
      {/*Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>

              <input
                type="text"
                className={errors.firstName ? "auth-input-error" : "auth-input"}
                {...register("firstName", {
                  required: "First Name is required",
                  maxLength: { value: 50, message: "At most 50 characters allowed" },
                  minLength: { value: 2, message: "At least 2 characters needed" },
                })}
              />

              {errors.firstName && <span className="text-red-500 text-sm ">{errors.firstName.message}</span>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>

              <input
                type="text"
                className={errors.lastName ? "auth-input-error" : "auth-input"}
                {...register("lastName", {
                  required: "Last Name is required",
                  maxLength: { value: 50, message: "At most 50 characters allowed" },
                  minLength: { value: 2, message: "At least 2 characters needed" },
                })}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              className={errors.email ? "auth-input-error" : "auth-input"}
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email Address is not valid",
                },
              })}
            />

            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              className={errors.password ? "auth-input-error" : "auth-input"}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters needed" } })}
            />

            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className={errors.confirmPassword ? "auth-input-error" : "auth-input"}
              placeholder=""
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
            />

            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          <SubmitButton isSubmitting={isSubmitting} buttonText="Sign Up" loadingText="Signing Up..." type="submit" />
        </div>
      </form>

      {/* Additional Links */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </FormCard>
  );
};

export default SignUpForm;
