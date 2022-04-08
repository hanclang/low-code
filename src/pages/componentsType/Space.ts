export default {
  type: "Space", // Space 组件必须要有一个childrens，默认给一个
  title: "间距",
  can_place: true,
  props: {
    style: {
      minHeight: 20,
      padding: "20px",
    },
  },
  childrens: [{ type: "div", is_native: true, props: {} }],
  config: {
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
