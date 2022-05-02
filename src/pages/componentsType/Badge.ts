export default {
  type: "Badge",
  title: "徽标数",
  props: {
    count: 10,
  },
  config: {
    count: {
      text: "数值",
      type:"number"
    },
    dot: {
      text: "不展示数字，只有一个小红点",
      enum: [true, false]
    },
    status: {
      text: "Badge 为状态点",
      enum: ["success", "processing", "default", "error", "warning"]
    },
    title: {
      text: "鼠标放在状态点上时显示的文字",
    }
  },
};
