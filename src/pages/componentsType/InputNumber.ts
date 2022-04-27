export default {
  type: "InputNumber",
  title: "数字输入框",
  props: {},
  config: {
    bordered: {
      text: "是否有边框",
      enum: [true, false]
    },
    disabled: {
      text: "禁用",
      enum: [true, false]
    },
    max: {
      text: "最大值",
      type: "number"
    },
    min: {
      text: "最小值",
      type: "number"
    },
    style: {
      width: {
        text: "宽度",
      },
    },
  },
};
