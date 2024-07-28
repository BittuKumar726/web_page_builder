import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

const App: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <button
        onClick={() => setIsPreview(!isPreview)}
        className="p-2 mt-2 ml-3 mr-3 bg-green-500 text-white rounded"
      >
        Change {isPreview ? "Edit Mode" : "Preview Mode"}
      </button>
      <div className="pl-3 pr-3 pb-3 pt-2 w-full h-[700px]">
        <Canvas isPreview={isPreview} />
      </div>
    </div>
  );
};

export default App;
