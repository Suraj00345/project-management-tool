import { Button, Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "lucide-react";
import { priority } from "../../utils/data";
import Loader from "../../Layouts/Loader";
import { editProjectApi, getSingleProjectDataApi } from "../../utils/api-client";

const ProjectEditModal = ({ projectId, onEdit, isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(true);

  function close() {
    setIsOpen(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      priority: priority[0].id,
    },
  });

  const fetchProjectData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSingleProjectDataApi(projectId);

      setValue("title", data.title);
      setValue("description", data.description);
      setValue("priority", data.priority);
    } catch (error) {
      toast.error(error.message || "Error fetching project data");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, setValue]);

  useEffect(() => {
    if (isOpen) {
      fetchProjectData();
    }
  }, [fetchProjectData, isOpen]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      const res = await editProjectApi(projectId, data);
      if (!res._id) throw new Error("Project update failed");

      toast.success("Project updated successfully");
      onEdit(res);
      close();
    } catch (error) {
      toast.error(error.message || "Error updating project");
    }
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm ">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className="border border-gray-50 shadow  w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              Edit Project Details
              <p className="text-sm text-gray-600 font-normal">Please fill out the form below to edit the project details.</p>
            </DialogTitle>

            {isLoading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-2">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-800">Project Title</label>
                  <input
                    type="text"
                    className={clsx(
                      "min-w-none w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none transition-colors placeholder:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    )}
                    {...register("title", {
                      required: "Project title is required",
                      minLength: { value: 3, message: "Title must be at least 3 characters long" },
                      maxLength: { value: 50, message: "Title Must be at most 50 characters long" },
                    })}
                  />
                  {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-800">Project Description</label>
                  <textarea
                    rows={4}
                    className={clsx(
                      "max-h-36 min-h-24 min-w-none w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none transition-colors placeholder:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    )}
                    {...register("description", {
                      required: "Project description is required",
                      minLength: { value: 10, message: "Description must be at least 10 characters long" },
                      maxLength: { value: 500, message: "Description must be at most 500 characters long" },
                    })}
                  />
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div className="">
                  <label>Project Priority</label>

                  <div className="flex bg-blue-50 w-fit rounded-md mt-2">
                    {priority.map((item) => (
                      <div key={item.id}>
                        <input id={`priority-${item.id}`} {...register("priority")} type="radio" value={item.id} className="hidden peer" />

                        <label
                          htmlFor={`priority-${item.id}`}
                          className="block text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors peer-checked:bg-blue-500 peer-checked:text-white peer-checked:hover:bg-blue-500 peer-checked:hover:text-white"
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 lg:mt-8 flex justify-end gap-2">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-blue-600 data-open:bg-blue-500 cursor-pointer disabled:bg-blue-400"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>

                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-gray-800 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-300 data-hover:bg-gray-300 data-open:bg-gray-200 cursor-pointer"
                    onClick={close}
                    type="reset"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProjectEditModal;
