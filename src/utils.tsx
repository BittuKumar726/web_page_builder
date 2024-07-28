import { CSSProperties } from "react";

export const ItemTypes = {
  TEXT: "text",
  IMAGE: "image",
  BUTTON: "button",
};

export function getDraggingStyles(
  left: number,
  top: number,
  isDragging: boolean,
  isOutLine: boolean,
  isPreview: boolean
): CSSProperties {
  if (isPreview) {
    return {
      position: "absolute",
      left,
      top,
      outline: "none",
    };
  }
  return {
    position: "absolute",
    left,
    top,
    opacity: isDragging ? 0 : 1,
    cursor: "move",
    outline: isOutLine ? "" : "none",
  };
}
