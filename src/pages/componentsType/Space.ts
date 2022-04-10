export default {
  type: "Space", // Space 组件必须要有一个childrens，默认给一个
  title: "间距",
  can_place: true,
  props: {},
  childrens: [{ type: "div", title: "占位", is_native: true, props: {
    content: "Space占位用的",
    style: {
      margin: "10px"
    }
  } }],
  config: {
    align: {
      text: "对齐方式",
      enum: ["start", "end","center","baseline"],
    },
    direction: {
      text: "间距方向",
      enum: ["vertical", "horizontal"]
    },
    size: {
      text: "间距大小",
      valueType: "number"
    },
    style: {
      padding: {
        text: "内间距",
        type: "4-value",
      },
      margin: {
        text: "外边距",
        type: "4-value",
      },
      backgroundColor: {
        text: "背景色",
        type: "color",
      },
    },
  },
};
