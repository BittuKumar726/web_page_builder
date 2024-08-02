import React from "react";
import { useDrag } from "react-dnd";

interface DraggableItemProps {
  type: string;
  bgColor: string;
  children: React.ReactNode;
  isPreview: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  type,
  bgColor,
  children,
  isPreview,
}) => {
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
      ref={!isPreview ? drag : null} // Attach drag ref to the div
      className={`p-2 m-2 border rounded border-gray-400 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100" // Adjust opacity based on dragging state
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

interface ToolbarProps {
  isPreview: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ isPreview }) => {
  return (
    <div className="flex justify-between p-2 bg-gray-100 border-b border-gray-300 items-center">
      <div className="w-[35%] p-2">
        <span className="font-bold">Web page builder</span>
      </div>
      <div className="flex w-[50%]">
        <DraggableItem type="text" bgColor="white" isPreview={isPreview}>
          Text
        </DraggableItem>
        <DraggableItem type="image" bgColor="#c6de75" isPreview={isPreview}>
          Image
        </DraggableItem>
        <DraggableItem type="button" bgColor="#3b82f6" isPreview={isPreview}>
          Button
        </DraggableItem>
      </div>
      <div></div>
    </div>
  );
};

export default Toolbar;
