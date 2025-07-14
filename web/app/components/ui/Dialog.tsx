import React, { useEffect } from "react";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { subscribe, unsubscribe } from "pubsub-js";
import { usePathname } from "next/navigation";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const pathname = usePathname();
  useEffect(() => {
    const token = subscribe("DIALOG.CLOSE", () => {
      onClose();
    });
    return () => {
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
      className='ui-dialog  has-blur '
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: "100%" }}
        animate={{ scale: 1, opacity: 1, y: "0%" }}
        exit={{ scale: 0.95, opacity: 0, y: "100%" }}
        transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
        className={`dialog-inner relative ${className}`}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className='absolute top-4 right-4 '>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};
