import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Ellipsis } from "lucide-react";
import { ArchiveBoxXMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import ProjectDeleteModal from "./ProjectDeleteModal";
import { useState } from "react";
import ArchiveModal from "./ArchiveModal";
import ProjectEditModal from "./ProjectEditModal";

const ProjectCardDropdown = ({ projectId, onDelete, onArchive, onEdit }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="absolute top-2 right-2 bg-white/5 hover:bg-white/10 p-1 rounded-xl cursor-pointer ">
          <Ellipsis className="text-white h-4" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10"
              onClick={() => setEditModalOpen(true)}
            >
              <PencilIcon className="size-4 fill-black/30" />
              Edit
            </button>
          </MenuItem>

          <div className="my-1 h-px bg-black/5" />
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10"
              onClick={() => setArchiveModalOpen(true)}
            >
              <ArchiveBoxXMarkIcon className="size-4 fill-black/30" />
              Archive
            </button>
          </MenuItem>

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10"
              onClick={() => setDeleteModalOpen(true)}
            >
              <TrashIcon className="size-4 fill-black/30" />
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      <ProjectDeleteModal projectId={projectId} isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onDelete={onDelete} />
      <ArchiveModal projectId={projectId} isOpen={archiveModalOpen} setIsOpen={setArchiveModalOpen} onArchive={onArchive} />
      <ProjectEditModal projectId={projectId} isOpen={editModalOpen} setIsOpen={setEditModalOpen} onEdit={onEdit} />
    </div>
  );
};

export default ProjectCardDropdown;
