import React, { useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import styles from "./index.less";
import { layout } from "./constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/models/store";

const DropContainer: React.FC<any> = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "tag",
    drop: () => ({ tagName: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const dragData = useSelector((state: RootState) => state.drag.data);
  const dispatch = useDispatch();

  const [isMoving, setIsMoving] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [movingLayout, setMovingLayout] = useState(layout); // 鼠标移动区域
  const [mouseDownLayout, setMouseDownLayout] = useState(layout); // 鼠标点击区域

  const getBoundingClientRect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const dom: HTMLDivElement = e.target as HTMLDivElement;
    const { width, height } = dom.getBoundingClientRect();
    return {
      width,
      height,
      top: dom.offsetTop,
      left: dom.offsetLeft,
    };
  };

  return (
    <div
      onMouseMove={(e) => {
        const { width, height, top, left } = getBoundingClientRect(e);
        setMovingLayout({
          width,
          height,
          top,
          left,
        });
        setIsMoving(true);
      }}
      onMouseDown={(e) => {
        const { width, height, top, left } = getBoundingClientRect(e);
        setMouseDownLayout({
          width,
          height,
          top,
          left,
        });
        setIsMouseDown(true);
      }}
      onMouseLeave={() => {
        setIsMoving(false);
      }}
      className={classNames(styles.container)}
    >
      {/* 鼠标滑动区域标识 */}
      <div
        className={classNames(styles.layoutBorder, styles.layoutSelecting, {
          [styles.isMoving]: isMoving,
        })}
        style={{
          width: movingLayout.width,
          height: movingLayout.height,
          top: movingLayout.top,
          left: movingLayout.left,
        }}
      >
        <div className={styles.borderAction}>Page</div>
      </div>
      {/* 鼠标点击区域标识 */}
      <div
        className={classNames(styles.layoutBorder, styles.layoutSelecting, {
          [styles.isMouseDown]: isMouseDown,
        })}
        style={{
          width: mouseDownLayout.width,
          height: mouseDownLayout.height,
          top: mouseDownLayout.top,
          left: mouseDownLayout.left,
        }}
      >
        <div className={styles.borderAction}>Page</div>
      </div>
      {/* TODO: 在面板里的组件怎么实现排序, 组件渲染 */}
      <div ref={drop} className={classNames(styles.dropContainer)}>
        <div style={{ display: "flex", padding: 8 }}>
          <div style={{ flex: 1 }}>2</div>
          <div style={{ flex: 1 }}>1</div>
        </div>
      </div>
    </div>
  );
};

export default DropContainer;
