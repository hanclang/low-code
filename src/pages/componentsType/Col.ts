export default {
  type: "Col",
  title: "列",
  can_place: true,
  props: {
    span: 2,
    style: {
      minHeight: 30
    }
  },
  config: {
    offset: {
      text: "栅格左侧的间隔格数",
      valueType: "number"
    },
    order: {
      text: "栅格顺序",
      valueType: "number"
    },
    pull: {
      text: "栅格向左移动格数",
      valueType: "number"
    },
    push: {
      text: "栅格向右移动格数",
      valueType: "number"
    },
    span: {
      text: "栅格占位格数",
      enum: Array.from({length: 24}).fill(0).map((item, index) => index + 1)
    }
  },
};
