import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes, getDraggingStyles } from "../utils";

interface ImageBoxProps {
  id: string;
  type: string;
  left: number;
  top: number;
  isPreview: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({ id, left, top, isPreview }) => {
  // Set up drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BUTTON, // Type of draggable item
      item: { id, type: ItemTypes.BUTTON, left, top }, // Data about the draggable item
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), // Track dragging state
      }),
    }),
    [id, left, top] // Dependencies for the drag hook
  );

  return (
    <div
      style={getDraggingStyles(left, top, isDragging, true, isPreview)}
      className="w-[20%]"
    >
      <input
        style={{ cursor: !isPreview ? "move" : "" }}
        type="file"
        className="w-full p-1 border-2 border-gray-500 bg-white"
        ref={isPreview ? null : drag}
      />
    </div>
  );
};

export default ImageBox;
