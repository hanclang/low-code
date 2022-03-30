import React from "react";
import { useDrag } from "react-dnd";
import { Tag } from "antd";

interface DragTagProps {
  tagName: string;
}

interface DropResult {
  tagName: string;
}

const DragTag: React.FC<DragTagProps> = (props) => {
  const { tagName } = props;
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "tag",
    item: { tagName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.tagName} into ${dropResult.tagName}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return <Tag ref={drag}>{tagName}</Tag>;
};

export default DragTag;
