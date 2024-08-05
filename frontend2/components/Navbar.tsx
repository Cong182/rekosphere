import React from "react";

interface NavbarProps {
  onAddContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddContactClick }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <img src="..\logo.png.png" alt="Logo" className="h-8" />
      </div>
      <button
        onClick={onAddContactClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Contact
      </button>
    </div>
  );
};

export default Navbar;
