import React, { useEffect, useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

interface ButtonBoxProps {
  left: number;
  top: number;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({ id, left, top, type }) => {
  const [text, setText] = useState("Click me");
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
    <button
      style={{ position: "absolute", left, top }}
      onClick={() => setText("Clicked")}
      className="p-2 bg-blue-500 text-white rounded"
      ref={drag}
    >
      {text}
    </button>
  );
};

export default ButtonBox;
