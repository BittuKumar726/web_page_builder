import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes, getDraggingStyles } from "../utils";

interface ButtonBoxProps {
  id: string;
  left: number;
  top: number;
  isPreview: boolean;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({ id, left, top, isPreview }) => {
  const [text, setText] = useState("Click me"); // State to store button text
  const [editing, setEditing] = useState(false); // State to manage editing mode
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element

  // Set up drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BUTTON, // Type of draggable item
      item: { id, type: ItemTypes.BUTTON, left, top }, // Data about the draggable item
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), // Track dragging state
      }),
    }),
    [id, left, top]
  );

  const handleDoubleClick = () => setEditing(true); // Enable editing mode on double-click

  useEffect(() => {
    if (isPreview) {
      if (editing && inputRef.current) {
        inputRef.current.focus(); // Focus on the input if in preview mode and editing
      }
    }
  }, [editing, isPreview]);

  useEffect(() => {
    if (!isPreview) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setEditing(false); // Disable editing mode if click occurs outside input
        }
      };

      if (editing) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [editing, isPreview]);

  return (
    <div
      onDoubleClick={!isPreview ? handleDoubleClick : () => {}} // Enable editing on double-click if not in preview mode
      style={getDraggingStyles(left, top, isDragging, false, isPreview)} // Apply styles based on drag state and preview mode
    >
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={text} // Bind input value to text state
            onChange={(e) => setText(e.target.value)} // Update text state on input change
            className="p-2 bg-white border border-gray-500 w-[150px]"
          />
        </>
      ) : (
        <button
          ref={!isPreview ? drag : null} // Attach drag ref if not in preview mode
          className="bg-blue-500 text-white rounded max-w-[200px] whitespace-normal break-words"
          style={{ cursor: !isPreview ? "move" : "", outline: "none" }} // Change cursor based on preview mode
          onClick={isPreview ? () => alert("Clicked on Button") : () => {}}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default ButtonBox;
