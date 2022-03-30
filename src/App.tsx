// src/app.tsx
import React from "react";
import BaseLayouts from "./layouts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC<any> = () => (
  <DndProvider backend={HTML5Backend}>
    <BaseLayouts />
  </DndProvider>
);

export default App;
