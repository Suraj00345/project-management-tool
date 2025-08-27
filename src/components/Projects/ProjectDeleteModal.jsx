import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProjectApi } from "../../utils/api-client";

const ProjectDeleteModal = ({ isOpen, setIsOpen, projectId, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  function close() {
    setIsOpen(false);
  }

  const deleteHandler = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await deleteProjectApi(projectId);
      if (!res) throw new Error("Project deletion failed");

      toast.success("Project deleted successfully");

      setIsOpen(false);
      onDelete(res);
    } catch (error) {
      toast.error(error.message || "Error deleting project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop:blur-md ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="border border-gray-50 shadow  w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Delete Project
              </DialogTitle>

              <p className="mt-2 text-sm/6 text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-500 cursor-pointer disabled:bg-red-400"
                  onClick={deleteHandler}
                >
                  <TrashIcon className="size-4 text-white" />
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-gray-800 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-300 data-hover:bg-gray-300 data-open:bg-gray-200 cursor-pointer"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProjectDeleteModal;
