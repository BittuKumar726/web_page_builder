import React, { useCallback, useState, useRef } from "react";
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
  const canvasRef = useRef<HTMLDivElement>(null); // Reference to the canvas element
  const [components, setComponents] = useState<ComponentProps[]>([]); // State to store the components on the canvas

  // Function to move a component to a new position
  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      const canvas = canvasRef.current?.getBoundingClientRect(); // Get the canvas boundaries
      if (canvas) {
        const component = components.find((comp) => comp.id === id); // Find the component by id
        const elementWidth = component?.width || 0;
        const elementHeight = component?.height || 0;

        // Ensure the component stays within the canvas boundaries
        left = Math.max(0, Math.min(left, canvas.width - elementWidth));
        top = Math.max(0, Math.min(top, canvas.height - elementHeight));
      }

      // Update the component's position in the state
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === id ? { ...component, left, top } : component
        )
      );
    },
    [components, setComponents]
  );

  // Function to add a new component to the canvas
  const addComponent = useCallback(
    (type: string, left: number, top: number) => {
      const canvas = canvasRef.current?.getBoundingClientRect(); // Get the canvas boundaries
      if (canvas) {
        const elementWidth = 100; // Default width
        const elementHeight = 50; // Default height

        // Ensure the component stays within the canvas boundaries
        left = Math.max(0, Math.min(left, canvas.width - elementWidth));
        top = Math.max(0, Math.min(top, canvas.height - elementHeight));
      }

      const id = `${type}-${components.length}`; // Generate a unique id for the component
      let width = 0;
      if (type === ItemTypes.TEXT || type === ItemTypes.IMAGE) {
        width = 340; // Default width for text and image components
      }

      // Add the new component to the state
      setComponents((prevComponents) => [
        ...prevComponents,
        { type, left, top, id, width: width, height: 50 }, // Default width and height
      ]);
    },
    [components, setComponents]
  );

  // Set up drop functionality using react-dnd
  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BUTTON, ItemTypes.TEXT, ItemTypes.IMAGE], // Accept these item types
      drop: (item: ComponentProps, monitor) => {
        const currentClientOffset = monitor.getClientOffset(); // Get the current mouse position
        const canvas = canvasRef.current?.getBoundingClientRect(); // Get the canvas boundaries

        if (currentClientOffset && canvas) {
          let left = currentClientOffset.x - canvas.left; // Calculate the drop position within the canvas
          let top = currentClientOffset.y - canvas.top;

          const elementWidth = item.width || 0;
          const elementHeight = item.height || 0;

          // Ensure the component stays within the canvas boundaries
          left = Math.max(0, Math.min(left, canvas.width - elementWidth));
          top = Math.max(0, Math.min(top, canvas.height - elementHeight));

          // If the item does not have an id, add it as a new component; otherwise, move the existing component
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

  const onRemoveComponent = (id: string) => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this component?"
    );
    if (confirmRemoval) {
      setComponents((prevComponents) =>
        prevComponents.filter((comp) => comp.id !== id)
      );
    }
  };

  // Callback ref for handling the canvas reference assignment
  const canvasRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drop(node); // Attach drop ref if not in preview mode
        (canvasRef as React.MutableRefObject<HTMLDivElement>).current = node;
      }
    },
    [drop]
  );

  return (
    <div
      ref={!isPreview ? canvasRefCallback : null}
      className="relative w-full h-[700px] border border-gray-100"
      style={
        isPreview
          ? { border: "1px solid gray", backgroundColor: "white" } // Style for preview mode
          : { border: "1px solid gray" } // Style for edit mode
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
                onRemove={onRemoveComponent}
              />
            );
          case ItemTypes.IMAGE:
            return (
              <ImageBox
                key={component.id}
                {...component}
                isPreview={isPreview}
                onRemove={onRemoveComponent}
              />
            );
          case ItemTypes.BUTTON:
            return (
              <ButtonBox
                key={component.id}
                {...component}
                isPreview={isPreview}
                onRemove={onRemoveComponent}
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
