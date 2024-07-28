import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import TextBox from "./TextBox";
import ImageBox from "./ImageBox";
import ButtonBox from "./ButtonBox";

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
      accept: ["text", "image", "button"],
      drop: (item: ComponentProps, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const initialClientOffset = monitor.getInitialClientOffset();
        const currentClientOffset = monitor.getSourceClientOffset();
        const canvas = canvasRef.current?.getBoundingClientRect();
        const wh = window.innerHeight;
        const ww = window.innerWidth;
        console.log({
          delta,
          initialClientOffset,
          currentClientOffset,
          canvas,
          wh,
          ww,
        });

        if (delta && initialClientOffset && canvas) {
          if (!item?.id) {
            let x =
              390 - Math.abs(delta.x) > 0
                ? (392 - Math.abs(delta.x)) / 10
                : 392 - Math.abs(delta.x);
            let y =
              Math.abs(delta.y) - 119 > 0
                ? (Math.abs(delta.y) - 119) / 10
                : Math.abs(delta.y) - 119;
            console.log({ x, y });

            const left = Math.floor(x);
            const top = Math.floor(y);
            addComponent(item.type, left, top);
          } else {
            let x = Math.abs(currentClientOffset.x) / 2;
            let y = Math.abs(173 - Math.abs(currentClientOffset.y));
            console.log({ x, y });

            const left = Math.round(x / 32) * 32;
            const top = Math.round(y / 32) * 32;
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
      className="relative w-[80%] h-[80%] border border-gray-100"
    >
      {components.map((component) => {
        switch (component.type) {
          case "text":
            return <TextBox key={component.id} {...component} />;
          case "image":
            return <ImageBox key={component.id} {...component} />;
          case "button":
            return <ButtonBox key={component.id} {...component} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Canvas;
