import { useForm } from "react-hook-form";
import FloatingElements from "../components/Auth/FloatingElements";
import FormCard from "../components/Auth/FormCard";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../utils/api-client";
import { useAuthStore } from "../store/useAuthStore";
import SubmitButton from "../components/Auth/SubmitButton";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "rs.2001.saha@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const response = await loginApi(data.email, data.password);
      if (!response.token) {
        throw new Error("Login failed. Please try again.");
      }

      login(response.user, response.token);
      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
      <FloatingElements />

      <section className="w-full">
        <FormCard title="Login to your account">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 mt-8">
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

              {/* Login Button */}
              <SubmitButton isSubmitting={isSubmitting} buttonText="Sign In" loadingText="Signing In..." type="submit" />
            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </FormCard>
      </section>
    </div>
  );
}
