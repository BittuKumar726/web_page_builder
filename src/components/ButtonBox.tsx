import React, { useState } from "react";

interface ButtonBoxProps {
  left: number;
  top: number;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({ left, top }) => {
  const [text, setText] = useState("Click me");

  return (
    <button
      style={{ position: "absolute", left, top }}
      onClick={() => setText("Clicked")}
      className="p-2 bg-blue-500 text-white rounded"
    >
      {text}
    </button>
  );
};

export default ButtonBox;
