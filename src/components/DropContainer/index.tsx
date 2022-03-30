import React from "react";
import { useDrop } from "react-dnd";

import styles from "./index.less";

const DropContainer: React.FC<any> = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "tag",
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div className={styles.container} ref={drop}>
      {isActive ? "Release to drop" : "Drag a box here"}
    </div>
  );
};

export default DropContainer;
