import React, { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import styles from "./index.less";
import { layout } from "./constant";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/models/store";

import { setSelectComponents } from "src/models/dragSlice";

import antd from "src/pages/antdComponents";

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

  // TODO: 代码优化
  let movingResizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        let entry = entries[0];
        const { width, height, top, left } = getBoundingClientRect(
          entry as any
        );
        setMovingLayout({
          width,
          height,
          top,
          left,
        });
      }),
    []
  );

  let mouseDownResizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        let entry = entries[0];
        const { width, height, top, left } = getBoundingClientRect(
          entry as any
        );
        setMouseDownLayout({
          width,
          height,
          top,
          left,
        });
      }),
    []
  );

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

  const getComponent = (componentNames: string[]): typeof antd => {
    if (componentNames.length === 1) {
      return antd[componentNames[0]];
    } else {
      const lastT = componentNames.pop()!;
      const com = getComponent(componentNames)[lastT];
      return com;
    }
  };

  const renderDragComponents = (componentDatas: any[]): React.ReactNode => {
    return componentDatas.map((d: any, i: number) => {
      let component;
      component = getComponent(d.type.split("."));

      let realProps = d.props ? { ...d.props, key: d.id } : {};

      for (let key in realProps) {
        if (
          typeof realProps[key] === "object" &&
          realProps[key].type === "relative"
        ) {
          realProps[key] = realProps[realProps[key].target]
            ? realProps[key].true
            : realProps[key].false;
        }
      }

      realProps.onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setSelectComponents(d));
      };

      return React.createElement(
        component,
        realProps,
        d.props.content
          ? [d.props.content]
          : d.childrens
          ? renderDragComponents(d.childrens)
          : null
      );
    });
  };

  return (
    <div
      onMouseOver={(e) => {
        movingResizeObserver.disconnect();
        // @ts-ignore
        movingResizeObserver.observe(e.target);
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
        mouseDownResizeObserver.disconnect();
        // @ts-ignore
        mouseDownResizeObserver.observe(e.target);
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
        {renderDragComponents(dragData)}
      </div>
    </div>
  );
};

export default DropContainer;
