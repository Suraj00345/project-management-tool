import { LoaderCircle } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <LoaderCircle className="animate-spin h-12 w-12 text-blue-400" />
    </div>
  );
};

export default LoadingScreen;
