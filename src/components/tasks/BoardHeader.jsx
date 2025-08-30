import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, X } from "lucide-react";
import useOpen from "../../hooks/useOpen";
import clsx from "clsx";
import { editProjectApi } from "../../utils/api-client";
import toast from "react-hot-toast";

const BoardHeader = ({ projectTitle, onUpdate, projectId }) => {
  const { isOpen, close, toggle } = useOpen();
  const [title, setTitle] = useState(projectTitle);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const updateHandler = async () => {
    close();
    if (isSubmitting) return;

    if (title.trim() === "") {
      toast.error("List title cannot be empty");
      return setTitle(projectTitle);
    }

    if (title === projectTitle) return;

    try {
      setIsSubmitting(true);
      const response = await editProjectApi(projectId, { title });
      onUpdate(response.title);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error(error.message || "Error updating project");
      setTitle(projectTitle);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8 flex-shrink-0 flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-4 lg:min-w-lg">
        <button
          onClick={toggle}
          className={clsx("p-1 cursor-pointer", {
            "text-red-500": isOpen,
            "text-green-500": !isOpen,
          })}
        >
          {isOpen ? <X className="w-4 sm:w-6" /> : <Edit2 className="w-4 sm:w-6" />}
        </button>

        {isOpen ? (
          <>
            <input
              type="text"
              disabled={isSubmitting}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onBlur={updateHandler}
              className={clsx(
                "border border-gray-300 rounded-md p-2 ",
                {
                  "border-red-500": !title,
                },
                "min-w-full"
              )}
            />
          </>
        ) : (
          <h1 className="text-2xl font-bold text-black mb-2">{projectTitle}</h1>
        )}
      </div>

      <button
        onClick={() => navigate("/projects")}
        className="h-10 w-10 sm:w-auto flex items-center justify-center gap-2 p-2 text-white  border bg-blue-600 rounded-lg hover:cursor-pointer"
      >
        <ArrowLeft size={13} />
        <span className="hidden sm:inline">Go Back</span>
      </button>
    </div>
  );
};

export default BoardHeader;
