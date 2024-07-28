import React, { useCallback } from "react";
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
  components: ComponentProps[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentProps[]>>;
}

const Canvas: React.FC<CanvasProps> = ({ components, setComponents }) => {
  const canvasRef = React.useRef<HTMLDivElement>(null);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === id ? { ...component, left, top } : component
        )
      );
    },
    [setComponents]
  );

  const addComponent = useCallback(
    (type: string, left: number, top: number) => {
      const id = `${type}-${components.length}`;
      setComponents((prevComponents) => [
        ...prevComponents,
        { type, left, top, id },
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
          const left = currentClientOffset.x - canvas.left;
          const top = currentClientOffset.y - canvas.top;

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
      ref={(node) => {
        drop(node);
        canvasRef.current = node;
      }}
      className="relative w-full h-screen border border-gray-100"
    >
      {components.map((component) => {
        switch (component.type) {
          case ItemTypes.TEXT:
            return <TextBox key={component.id} {...component} />;
          case ItemTypes.IMAGE:
            return <ImageBox key={component.id} {...component} />;
          case ItemTypes.BUTTON:
            return <ButtonBox key={component.id} {...component} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Canvas;
