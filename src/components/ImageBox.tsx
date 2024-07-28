import React, { useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

interface ImageBoxProps {
  id: string;
  type: string;
  left: number;
  top: number;
}

const ImageBox: React.FC<ImageBoxProps> = ({ id, left, top, type }) => {
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
    <div style={{ position: "absolute", left, top }} ref={drag}>
      <input
        type="file"
        className="w-full p-1 border border-gray-400 bg-white"
      />
    </div>
  );
};

export default ImageBox;
