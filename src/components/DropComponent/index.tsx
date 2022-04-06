import { cloneDeep } from "lodash-es";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateChildren } from "src/models/dragSlice";

interface DropComponentProps {
  id: string;
}

const DropComponent: React.FC<DropComponentProps> = ({ children, id }) => {
  const dispatch = useDispatch();
  const [{ isOverCurrent, isOver }, drop] = useDrop(() => ({
    accept: "tag",
    drop: (item: {draggingData: any}, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      dispatch(updateChildren({id: id, dragData: cloneDeep(item.draggingData)}));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));
  // @ts-ignore
  const style = children?.props?.style || {};
  // @ts-ignore
  return React.cloneElement(children, {
    ref: drop, // TODO: 函数组件的ref问题，如Layout组件是函数组件
    style: { ...style, border: isOverCurrent ? "1px dashed red" : "" },
  });
};

export default DropComponent;
