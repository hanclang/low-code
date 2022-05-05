export default {
  type: "Rate",
  title: "评分",
  props: {
    count: 6
  },
  config: {
    count: {
      text: "star 总数",
      valueType: "number"
    },
    disabled: {
      text: "是否禁用",
      enum: [true, false],
    },
    allowHalf: {
      text: "是否允许半选",
      enum: [true, false],
    },
  },
};
