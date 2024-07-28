import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes, getDraggingStyles } from "../utils";
import { FaTimes } from "react-icons/fa"; // FontAwesome icon for close button

interface ButtonBoxProps {
  id: string;
  left: number;
  top: number;
  isPreview: boolean; // Preview mode flag
  onRemove: (id: string) => void; // Function to handle remove action
}

const ButtonBox: React.FC<ButtonBoxProps> = ({
  id,
  left,
  top,
  isPreview,
  onRemove,
}) => {
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
      onDoubleClick={!isPreview ? handleDoubleClick : () => {}}
      style={getDraggingStyles(left, top, isDragging, false, isPreview)}
      className="relative"
      ref={!isPreview ? drag : null}
    >
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text state on input change
            className="p-2 bg-white border border-gray-500 w-[150px]"
          />
        </>
      ) : (
        <>
          {!isPreview && (
            <div
              onClick={() => onRemove(id)}
              className="absolute top-[-8px] right-[-8px] p-1 bg-red-500 text-white rounded-full cursor-pointer"
            >
              <FaTimes size={10} />
            </div>
          )}
          <button
            className="bg-blue-500 text-white rounded max-w-[200px] whitespace-normal break-words"
            style={{ cursor: !isPreview ? "move" : "", outline: "none" }}
            onClick={isPreview ? () => alert("Clicked on Button") : () => {}}
          >
            {text}
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonBox;
