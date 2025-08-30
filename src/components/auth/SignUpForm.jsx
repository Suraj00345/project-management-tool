import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormCard from "./FormCard";
import { useRegistrationStore } from "../../store/useRegisrationStore";
import { registerAPI } from "../../utils/api-client";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import clsx from "clsx";
import EyeButton from "./EyeButton";

const SignUpForm = () => {
  const { setRegistrationData, setVerify } = useRegistrationStore((state) => state);
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
            <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              id="regEmail"
              className={errors.email ? "auth-input-error" : "auth-input"}
              autoComplete="email"
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
            <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="regPassword"
                name="password"
                autoComplete="new-password"
                className={clsx(errors.password ? "auth-input-error" : "auth-input", "pr-12")}
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters needed" } })}
              />
              <EyeButton showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>

            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className={clsx(errors.confirmPassword ? "auth-input-error" : "auth-input", "pr-12")}
                placeholder=""
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <EyeButton showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>

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
