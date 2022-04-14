import { cloneDeep } from "lodash-es";
import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { appendCom, updateChildren } from "src/models/dragSlice";

interface DropComponentProps {
  id: string;
  index: number;
  parentId: string;
  data: any;
}

const DropComponent: React.FC<DropComponentProps> = ({ children, id, index, parentId, data }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [positionDown, setPosition] = useState(true);

  const dispatch = useDispatch();
  const [{ isOverCurrent, canDrop }, drop] = useDrop(() => ({
    accept: "tag",
    drop: (item: {draggingData: any}, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (!item.draggingData.id) {
        console.log(index, positionDown);
        dispatch(
          appendCom({
            hoverParentId: parentId,
            hoverIndex: index,
            data,
            item: cloneDeep(item.draggingData),
            positionDown,
          })
        );
      }
      // dispatch(updateChildren({id: id, dragData: cloneDeep(item.draggingData)}));
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover && ref.current) {
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position

        const clientOffset = monitor.getClientOffset();

        if (clientOffset) {
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (hoverClientY <= hoverMiddleY) {
            setPosition(false);
          }
          // Dragging upwards
          if (hoverClientY > hoverMiddleY) {
            setPosition(true);
          }
        }
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [positionDown, id]);
  // @ts-ignore
  const style = children?.props?.style || {};
  drop(ref);

  return <Wrapper dropRef={ref}>
  {isOverCurrent && canDrop && !positionDown ? (
    <div style={{border: "3px solid red", display: "inline-block"}} />
  ) : null}
  {// @ts-ignore
    React.cloneElement(children, {
      style: { ...style, border: isOverCurrent ? "1px dashed red" : "" },
    })
  }
  {isOverCurrent && canDrop && positionDown ? (
    <div style={{border: "3px solid red", display: "inline-block"}} />
  ) : null}
  </Wrapper>
  ;
};

// 包一层防止react-dnd获取不到dom实例
class Wrapper extends React.PureComponent<any> {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.props.dropRef.current = ReactDOM.findDOMNode(this);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  render() {
    return this.props.children;
  }
}

export default DropComponent;
