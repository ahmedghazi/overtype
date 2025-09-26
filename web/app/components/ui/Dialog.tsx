import React, { useEffect, useState, useRef } from "react";
import { ReactNode } from "react";
import { gsap } from "gsap";
import { subscribe, unsubscribe } from "pubsub-js";
import { usePathname } from "next/navigation";
import Btn from "./buttons/Btn";
import BtnIcon from "./buttons/BtnIcon";

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
  const DURATION = 0.6;
  // const [open, setOpen] = useState<boolean>(isOpen);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, DURATION * 1000);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", _onKeyDown, false);

    const token = subscribe("DIALOG.CLOSE", () => {
      onClose();
    });
    return () => {
      unsubscribe(token);
    };
  }, []);

  const _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    onClose();
  }, [pathname]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.from(overlayRef.current!, {
        opacity: 0,
        duration: DURATION,
        ease: "power2.inOut",
      });

      gsap.from(dialogRef.current!, {
        scale: 0.95,
        opacity: 0,
        y: "100%",
        duration: DURATION,
        ease: "power2.inOut",
      });

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, DURATION]);

  useEffect(() => {
    if (isClosing) {
      const tl = gsap.timeline();
      tl.to(dialogRef.current!, {
        scale: 0.95,
        opacity: 0,
        y: "100%",
        duration: DURATION,
        ease: "power2.inOut",
      }).to(overlayRef.current!, {
        opacity: 0,
        duration: DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          onClose();
          setIsClosing(false);
        },
      });
      document.body.style.overflow = "auto";
    } else {
      // document.body.style.overflow = "hidden";
    }
  }, [isClosing, DURATION, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className='ui-dialog  has-blur'
      onClick={() => setIsClosing(true)}>
      <div
        ref={dialogRef}
        className={`dialog-inner relative ${className}`}
        onClick={(e) => e.stopPropagation()}>
        <div className='absolute top-4 right-4 '>
          <BtnIcon icon='close' onClick={() => setIsClosing(true)} />
        </div>
        {/* <button
          onClick={() => setIsClosing(true)}
          className='absolute top-4 right-4 hover:scale-110 transition-transform duration-200'>
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
        </button> */}
        {children}
      </div>
    </div>
  );
};
