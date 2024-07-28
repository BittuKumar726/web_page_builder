import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import TextBox from "./TextBox";
import ImageBox from "./ImageBox";
import ButtonBox from "./ButtonBox";
import { ItemTypes } from "../utils";

interface ComponentProps {
  type: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  id: string;
}

interface CanvasProps {
  isPreview: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ isPreview }) => {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [components, setComponents] = useState<ComponentProps[]>([]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      const canvas = canvasRef.current?.getBoundingClientRect();
      if (canvas) {
        const component = components.find((comp) => comp.id === id);
        const elementWidth = component?.width || 0;
        const elementHeight = component?.height || 0;

        left = Math.max(0, Math.min(left, canvas.width - elementWidth));
        top = Math.max(0, Math.min(top, canvas.height - elementHeight));
      }

      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === id ? { ...component, left, top } : component
        )
      );
    },
    [components, setComponents]
  );

  const addComponent = useCallback(
    (type: string, left: number, top: number) => {
      const canvas = canvasRef.current?.getBoundingClientRect();
      if (canvas) {
        const elementWidth = 100; // Default width, can be adjusted as needed
        const elementHeight = 50; // Default height, can be adjusted as needed

        left = Math.max(0, Math.min(left, canvas.width - elementWidth));
        top = Math.max(0, Math.min(top, canvas.height - elementHeight));
      }

      const id = `${type}-${components.length}`;
      let width = 0;
      if (type === ItemTypes.TEXT || type === ItemTypes.IMAGE) {
        width = 340;
      }
      setComponents((prevComponents) => [
        ...prevComponents,
        { type, left, top, id, width: width, height: 50 }, // Default width and height
      ]);
    },
    [components, setComponents]
  );

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BUTTON, ItemTypes.TEXT, ItemTypes.IMAGE],
      drop: (item: ComponentProps, monitor) => {
        const currentClientOffset = monitor.getClientOffset();
        const canvas = canvasRef.current?.getBoundingClientRect();

        if (currentClientOffset && canvas) {
          let left = currentClientOffset.x - canvas.left;
          let top = currentClientOffset.y - canvas.top;

          const elementWidth = item.width || 0;
          const elementHeight = item.height || 0;

          left = Math.max(0, Math.min(left, canvas.width - elementWidth));
          top = Math.max(0, Math.min(top, canvas.height - elementHeight));

          if (!item?.id) {
            addComponent(item.type, left, top);
          } else {
            moveBox(item.id, left, top);
          }
        }
      },
    }),
    [moveBox, addComponent]
  );

  return (
    <div
      ref={
        !isPreview
          ? (node) => {
              drop(node);
              canvasRef.current = node;
            }
          : null
      }
      className="relative w-full h-[700px] border border-gray-100"
      style={
        isPreview
          ? { border: "1px solid gray", backgroundColor: "white" }
          : { border: "1px solid gray" }
      }
    >
      <div
        style={{
          float: "right",
          padding: "10px",
          border: "2px solid",
          textAlign: "center",
          wordBreak: "break-word",
          color: isPreview ? "white" : "black",
          backgroundColor: isPreview ? "gray" : "white",
        }}
      >
        {isPreview ? "Preview Mode" : "Edit Mode"}
      </div>
      {components.map((component) => {
        switch (component.type) {
          case ItemTypes.TEXT:
            return (
              <TextBox
                key={component.id}
                {...component}
                isPreview={isPreview}
              />
            );
          case ItemTypes.IMAGE:
            return (
              <ImageBox
                key={component.id}
                {...component}
                isPreview={isPreview}
              />
            );
          case ItemTypes.BUTTON:
            return (
              <ButtonBox
                key={component.id}
                {...component}
                isPreview={isPreview}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Canvas;
