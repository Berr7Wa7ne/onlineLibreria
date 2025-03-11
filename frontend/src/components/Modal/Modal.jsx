// Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  