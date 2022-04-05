import React from "react";
import { useDrag } from "react-dnd";
import { Tag } from "antd";
import { setDragData, updateChildren } from "src/models/dragSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/models/store";
import { cloneDeep } from "lodash";

interface DragTagProps {
  tagName: string;
  draggingData: any
}

interface DropResult {
  tagName: string;
  id: string;
}

const DragTag: React.FC<DragTagProps> = (props) => {
  const { tagName, draggingData } = props;

  const dragData = useSelector((state: RootState) => state.drag.data);
  const dispatch = useDispatch();

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "tag",
    item: { draggingData },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log(dropResult);
      if (monitor.didDrop() && !dropResult?.id) {
        dispatch(setDragData(cloneDeep(item.draggingData)));
      }
      if (monitor.didDrop() && dropResult?.id) {
        dispatch(updateChildren({id: dropResult?.id, dragData: cloneDeep(item.draggingData)}));
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
