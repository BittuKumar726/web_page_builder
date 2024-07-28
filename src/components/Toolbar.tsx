import React from "react";
import { useDrag } from "react-dnd";

interface DraggableItemProps {
  type: string;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, left: 10, top: 10 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded border-gray-400 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
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
