import { cloneDeep } from "lodash-es";
import React from "react";
import { useDrop } from "react-dnd";
import ReactDOM from "react-dom";
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


  return <Wrapper dropRef={drop}>
  {// @ts-ignore
    React.cloneElement(children, {
      style: { ...style, border: isOverCurrent ? "1px dashed red" : "" },
    })
  }
  </Wrapper>
  ;
};

// 包一层防止react-dnd获取不到dom实例
class Wrapper extends React.PureComponent<any> {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.props.dropRef({current: ReactDOM.findDOMNode(this)});
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  render() {
    return this.props.children;
  }
}

export default DropComponent;
