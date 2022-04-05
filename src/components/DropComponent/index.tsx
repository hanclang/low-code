import React from "react";
import { useDrop } from "react-dnd";

interface DropComponentProps {
  id: string;
}

const DropComponent: React.FC<DropComponentProps> = ({ children, id }) => {
  const [{ isOverCurrent, isOver }, drop] = useDrop(() => ({
    accept: "tag",
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));
  // @ts-ignore
  const style = children?.props?.style || {};
  // @ts-ignore
  return React.cloneElement(children, {
    ref: drop,
    style: { ...style, border: isOverCurrent ? "1px dashed red" : "" },
  });
};

export default DropComponent;
