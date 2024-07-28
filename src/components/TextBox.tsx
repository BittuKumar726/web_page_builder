import React, { useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getDraggingStyles } from "../utils";
import { FaTimes } from "react-icons/fa";

interface TextBoxProps {
  id: string;
  key: string;
  type: string;
  left: number;
  top: number;
  isPreview: boolean; // Preview mode flag
  onRemove: (id: string) => void; // Function to handle remove action
}

const TextBox: React.FC<TextBoxProps> = ({
  id,
  type,
  left,
  top,
  isPreview,
  onRemove,
}) => {
  // Manage the text state for the input field
  const [text, setText] = useState("Enter the content input");

  // Set up drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type, // Type of draggable item
      item: { id, left, top, type: type }, // Data about the draggable item
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(), // Track dragging state
      }),
    }),
    [id, left, top, type] // Dependencies for the drag hook
  );

  return (
    <div
      className="w-[20%] relative"
      style={getDraggingStyles(left, top, isDragging, true, isPreview)}
      ref={!isPreview ? drag : null}
    >
      {!isPreview && (
        <div
          onClick={() => onRemove(id)}
          className="absolute top-[-8px] right-[-8px] p-1 bg-red-500 text-white rounded-full cursor-pointer"
        >
          <FaTimes size={10} />
        </div>
      )}
      <input
        placeholder="placeholder"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        className="w-full p-1 border-2 border-gray-500"
        style={{ cursor: !isPreview ? "move" : "" }}
      />
    </div>
  );
};

export default TextBox;
