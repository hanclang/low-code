/* eslint-disable complexity */
import React, { useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import styles from "./index.less";
import { layout } from "./constant";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/models/store";

import {
  moveCom,
  setDragData,
  setMouseMoveCom,
  setSelectComponents,
} from "src/models/dragSlice";

import antd from "src/pages/antdComponents";
import DropComponent from "../DropComponent";
import { cloneDeep } from "lodash-es";
import needWrapper from "./wrapperType";

const observerConfig = { attributes: true, };

const DropContainer: React.FC<any> = () => {
  const dragData = useSelector((state: RootState) => state.drag.data);
  const selectComponents = useSelector(
    (state: RootState) => state.drag.selectComponents
  );
  const mouseMoveCom = useSelector(
    (state: RootState) => state.drag.mouseMoveCom
  );
  const dispatch = useDispatch();

  const [{ isOverCurrent, isOver }, drop] = useDrop(() => ({
    accept: "tag",
    drop: (item: { draggingData: any }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (!item.draggingData.id) {
        dispatch(setDragData(cloneDeep(item.draggingData)));
      } else {
        dispatch(
          moveCom({
            dragParentId: item.draggingData.parentId,
            dragIndex: item.draggingData.index,
            // data,
            item: item.draggingData,
          })
        );
      }

    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  const [isMoving, setIsMoving] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [movingLayout, setMovingLayout] = useState(layout); // 鼠标移动区域
  const [mouseDownLayout, setMouseDownLayout] = useState(layout); // 鼠标点击区域
  const mouseDownRef = useRef<HTMLElement>(null);

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

  let mouseDownMutationObserver = useMemo(
    () =>
      new MutationObserver((entries) => {
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

  // hook ResizeObserver
  // useEffect(() => {
  //   window.addEventListener("transitionend", () => {
  //     if (mouseDownRef.current) {
  //       const { width, height, top, left } = getBoundingClientRect({
  //         target: mouseDownRef.current,
  //       } as any);
  //       setMouseDownLayout({
  //         width,
  //         height,
  //         top,
  //         left,
  //       });
  //     }
  //   });
  // }, []);

  const getBoundingClientRect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const dom: HTMLDivElement = e.target as HTMLDivElement;
    const { width, height, top, left } = dom.getBoundingClientRect();
    return {
      width,
      height,
      top: top,
      left: left,
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
      if (d.hasDelete) return null;
      if (d.is_native) {
        component = d.type;
      } else {
        component = getComponent(d.type.split("."));
      }

      let realProps = d.props ? { ...d.props, key: d.id } : { key: d.id };

      for (let key in realProps) {
        if (
          typeof realProps[key] === "object" &&
          realProps[key].type === "relative"
        ) {
          realProps[key] = realProps[realProps[key].target]
            ? realProps[key].true
            : realProps[key].false;
        } else if (realProps[key]?.type === "json") { // 输入是json字符串 比如Form表单
          try {
            realProps[key] = JSON.parse(realProps[key].value);
          } catch (error) {
            realProps[key] = {};
          }
        }
      }

      realProps.onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };
      if (!d.noBindEvent) { // 决定要不要邦事件
        realProps.onMouseDown = (e: React.MouseEvent) => {
          e.stopPropagation();
          dispatch(setSelectComponents(d));
          // @ts-ignore
          mouseDownRef.current = e.currentTarget;
          mouseDownResizeObserver.disconnect();
          mouseDownMutationObserver.disconnect();
          // @ts-ignore
          mouseDownResizeObserver.observe(e.currentTarget, observerConfig);
          mouseDownMutationObserver.observe(e.currentTarget, observerConfig);
          const { width, height, top, left } = getBoundingClientRect({
            target: e.currentTarget,
          } as any);
          setMouseDownLayout({
            width,
            height,
            top,
            left,
          });
          setIsMouseDown(true);
        };
        // 不冒泡
        realProps.onMouseOver = (e: any) => {
          e.stopPropagation();
          dispatch(setMouseMoveCom(d));

          movingResizeObserver.disconnect();
          // @ts-ignore
          movingResizeObserver.observe(e.currentTarget);
          const { width, height, top, left } = getBoundingClientRect({
            target: e.currentTarget,
          } as any);
          setMovingLayout({
            width,
            height,
            top,
            left,
          });
          setIsMoving(true);
        };
      } else {
        realProps.onMouseDown = (e: React.MouseEvent) => {
          e.stopPropagation();
        };
        realProps.onMouseOver = (e: React.MouseEvent) => {
          e.stopPropagation();
          movingResizeObserver.disconnect();
        };
      }
      if (d.can_place) {
        realProps.className = realProps.className
          ? styles.draggable + String(realProps.className)
          : styles.draggable;
      }

      if (d.type === "Card" && d.props.cover) {
        const src = d.props.coverImg || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";
        realProps.cover = <img alt="cover" src={src} />;
      }

      let jsxElement = React.createElement(
        component,
        realProps,
        d.props.content
          ? [d.props.content]
          : d.childrens
          ? renderDragComponents(d.childrens)
          : null
      );

      const wrapperDiv = needWrapper(d.type);
      // Radio组件有这个属性，不用type区分，防止在Radio.Group
      if (wrapperDiv.isWrapper || d.wrapper) {
        jsxElement = <div className={styles.wrapperDiv} style={
          wrapperDiv.isInline ? {display: "inline-block", width: "fit-content"} : {}
        } onMouseOver={realProps.onMouseOver} onMouseDown={realProps.onMouseDown}>
          {jsxElement}
        </div>;
      }

      if (!d.noBindEvent) {
        return (
          <DropComponent data={d} parentId={d.parentId} index={i} id={d.id} key={d.id}>
            {jsxElement}
          </DropComponent>
        );
      } else {
        return jsxElement;
      }
    });
  };

  return (
    <div
      onMouseOver={(e) => {
        dispatch(setMouseMoveCom({}));
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
        // @ts-ignore
        mouseDownRef.current = null;
        dispatch(setSelectComponents({id: "1245345"})); // 默认给一个id
        mouseDownResizeObserver.disconnect();
        mouseDownMutationObserver.disconnect();
        // @ts-ignore
        mouseDownResizeObserver.observe(e.target, observerConfig);
        // @ts-ignore
        mouseDownMutationObserver.observe(e.target, observerConfig);
        const { width, height, top, left } = getBoundingClientRect(e);
        setMouseDownLayout({
          width,
          height,
          top,
          left,
        });
        setIsMouseDown(true);
      }}
      onMouseOut={() => {
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
        <div className={styles.borderAction}>
          {mouseMoveCom.title || "Page"}
        </div>
      </div>
      {/* 鼠标点击区域标识 */}
      <div
        className={classNames(styles.layoutBorder, styles.layoutSelecting, {
          [styles.isMouseDown]: isMouseDown && selectComponents.id,
        })}
        style={{
          width: mouseDownLayout.width,
          height: mouseDownLayout.height,
          top: mouseDownLayout.top,
          left: mouseDownLayout.left,
        }}
      >
        <div className={styles.borderAction}>
          {selectComponents.title || "Page"}
        </div>
      </div>
      <div
        ref={drop}
        style={{ border: isOverCurrent ? "1px dashed red" : "" }}
        className={classNames(styles.dropContainer)}
      >
        {renderDragComponents(dragData)}
      </div>
    </div>
  );
};

export default DropContainer;
