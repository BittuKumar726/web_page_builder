import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

interface ComponentProps {
  type: string;
  left: number;
  top: number;
  id: number;
}

const App: React.FC = () => {
  const [components, setComponents] = useState<ComponentProps[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <button
        onClick={() => setIsPreview(!isPreview)}
        className="p-2 m-2 bg-green-500 text-white rounded"
      >
        {isPreview ? "Edit Mode" : "Preview Mode"}
      </button>
      <Canvas components={components} setComponents={setComponents} />
    </div>
  );
};

export default App;
