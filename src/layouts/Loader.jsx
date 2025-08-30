import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle className="animate-spin h-12 w-12 text-blue-400" />
    </div>
  );
};

export default Loader;
