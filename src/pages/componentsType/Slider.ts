export default {
  type: "Slider",
  title: "滑动输入条",
  props: {},
  config: {
    min: {
      text: "最小值",
      valueType: "number",
    },
    max: {
      text: "最大值",
      valueType: "number",
    },
    range: {
      text: "双滑块模式",
      enum: [true, false],
    },
  },
};
