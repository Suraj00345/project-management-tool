import React from 'react'

const useOpen = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return {
        isOpen,
        open,
        close,
        toggle

    };
}

export default useOpen