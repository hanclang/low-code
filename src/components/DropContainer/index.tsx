import React, { useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
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
  const [isMoving, setIsMoving] = useState(false);
  const [layoutBorder, setLayoutBorder] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div
      onMouseMove={(e) => {
        const dom: HTMLDivElement = e.target as HTMLDivElement;
        const { width, height } = dom.getBoundingClientRect();
        setLayoutBorder({
          width,
          height,
          top: dom.offsetTop,
          left: dom.offsetLeft,
        });
        setIsMoving(true);
      }}
      onMouseLeave={(e) => {
        setIsMoving(false);
      }}
      className={classNames(styles.container)}
    >
      <div
        className={classNames(styles.layoutBorder, styles.layoutSelecting, {
          [styles.isMoving]: isMoving,
        })}
        style={{
          width: layoutBorder.width,
          height: layoutBorder.height,
          top: layoutBorder.top,
          left: layoutBorder.left,
        }}
      >
        <div className={styles.borderAction}>Page</div>
      </div>
      <div ref={drop} className={classNames(styles.dropContainer)}>
        <div>{isActive ? "Release to drop" : "Drag a box here"}</div>
        <div>{isActive ? "Release to drop" : "Drag a box here"}</div>
        <div>{isActive ? "Release to drop" : "Drag a box here"}</div>

        <div style={{ display: "flex", padding: 8 }}>
          <div style={{ flex: 1 }}>2</div>
          <div style={{ flex: 1 }}>1</div>
        </div>
      </div>
    </div>
  );
};

export default DropContainer;
