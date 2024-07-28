import React, { CSSProperties, useEffect, useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

interface TextBoxProps {
  id: string;
  key: string;
  type: string;
  left: number;
  top: number;
}

function getStyles(
  left: number,
  top: number,
  isDragging: boolean
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  console.log({ left, top }, "jbsdjbcjbdsj");
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    left: left,
    top: top,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
    backgroundColor: "red",
  };
}

const TextBox: React.FC<TextBoxProps> = ({ id, key, type, left, top }) => {
  const [text, setText] = useState("Edit me");
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => setEditing(false);
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: type,
      item: { id, left, top, type: type },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, type]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="p-2 bg-white border border-gray-400"
      style={{ position: "absolute", left, top }}
      ref={drag}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className="w-full p-1 border border-gray-400"
      />
    </div>
  );
};

export default TextBox;
