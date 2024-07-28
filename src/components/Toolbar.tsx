import React from "react";
import { useDrag } from "react-dnd";

interface DraggableItemProps {
  type: string;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, children }) => {
  // Set up drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type, // Type of draggable item
    item: { type, left: 10, top: 10 }, // Data about the draggable item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Track dragging state
    }),
  }));

  return (
    <div
      ref={drag} // Attach drag ref to the div
      className={`p-2 m-2 border rounded border-gray-400 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100" // Adjust opacity based on dragging state
      }`}
    >
      {children}
    </div>
  );
};

const Toolbar: React.FC = () => {
  return (
    <div className="flex justify-center p-2 bg-gray-100 border-b border-gray-300">
      <DraggableItem type="text">Text</DraggableItem>
      <DraggableItem type="image">Image</DraggableItem>
      <DraggableItem type="button">Button</DraggableItem>
    </div>
  );
};

export default Toolbar;
