import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Edit3, MoreVertical, Trash2 } from "lucide-react";
import CardDeleteModal from "./CardDeleteModal";
import useOpen from "../../hooks/useOpen";

const TaskMenu = ({ cardId, onEnableEdit, onDelete }) => {
  const { isOpen: showDelete, open: openDelete, close: closeDelete } = useOpen();

  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="text-gray-400 cursor-pointer hover:text-gray-600 p-1 rounded lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="min-w-fit w-36 origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem
            as={"button"}
            onClick={onEnableEdit}
            className="cursor-pointer group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 text-gray-700"
          >
            <Edit3 size={14} />
            Edit
          </MenuItem>

          <MenuItem
            as={"button"}
            onClick={openDelete}
            className="cursor-pointer group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 text-red-500"
          >
            <Trash2 size={14} />
            Delete
          </MenuItem>
        </MenuItems>
      </Menu>

      <CardDeleteModal isOpen={showDelete} onOpen={openDelete} onClose={closeDelete} cardId={cardId} onDelete={onDelete} />
    </div>
  );
};

export default TaskMenu;
