
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalDropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLInputElement>;
}

const PortalDropdown = ({ isOpen, children, triggerRef }: PortalDropdownProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4, // 4px margin
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed z-[100] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default PortalDropdown;
