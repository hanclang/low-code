export default {
  type: "Divider",
  title: "分割线",
  props: {
    content: "",
    orientation: "center",
    dashed: false,
    style: {},
  },
  config: {
    dashed: {
      text: "是否虚线",
      enum:[true, false]
    },
    orientation: {
      text: "分割线标题的位置",
      enum:["left", "right", "center"]
    },
    content: {
      text: "嵌套的标题",
    },
    style: {
      width: {
        text: "宽度",
      },
      margin: {
        text: "外边距",
        type: "4-value",
      },
    },
  },
};
