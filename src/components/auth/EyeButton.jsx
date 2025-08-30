import { Eye, EyeOff } from "lucide-react";

function EyeButton({ showPassword, setShowPassword }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPassword((prev) => !prev)}
      className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
}

export default EyeButton;
