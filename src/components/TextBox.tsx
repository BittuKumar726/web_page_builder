import React, { CSSProperties, useEffect, useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { getDraggingStyles } from "../utils";

interface TextBoxProps {
  id: string;
  key: string;
  type: string;
  left: number;
  top: number;
  isPreview: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  id,
  type,
  left,
  top,
  isPreview,
}) => {
  const [text, setText] = useState("Enter the content input");
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => setEditing(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { id, left, top, type: type },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, type]
  );

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="w-[20%]"
      style={getDraggingStyles(left, top, isDragging, true, isPreview)}
    >
      <input
        placeholder="placeholder"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className="w-full p-1 border-2 border-gray-500"
        style={{ cursor: !isPreview ? "move" : "" }}
        ref={!isPreview ? drag : null}
      />
    </div>
  );
};

export default TextBox;
