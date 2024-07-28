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
  const [text, setText] = useState("Click me");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BUTTON,
      item: { id, type: ItemTypes.BUTTON, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  const handleDoubleClick = () => setEditing(true);

  useEffect(() => {
    if (isPreview) {
      if (editing && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [editing]);

  useEffect(() => {
    if (!isPreview) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setEditing(false);
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
  }, [editing]);

  return (
    <div
      onDoubleClick={!isPreview ? handleDoubleClick : () => {}}
      style={getDraggingStyles(left, top, isDragging, false, isPreview)}
    >
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 bg-white border border-gray-500 w-[150px]"
          />
        </>
      ) : (
        <button
          ref={!isPreview ? drag : null}
          className="bg-blue-500 text-white rounded max-w-[200px] whitespace-normal break-words"
          style={{ cursor: !isPreview ? "move" : "", outline: "none" }}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default ButtonBox;
