import React from "react";
import Button from "../Button";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  onClose,
}) => {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <h2 className="text-base font-semibold text-gray-900">{children}</h2>
      {onClose && (
        <Button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 px-2 border rounded hover:bg-gray-100"
          aria-label="Close"
        >
          &#x2715;
        </Button>
      )}
    </div>
  );
};

interface ModalContentProps {
  children: React.ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">{children}</div>
  );
};

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <div className="flex justify-end gap-2 px-4 py-2">{children}</div>;
};
