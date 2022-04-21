export default {
  type: "Layout.Sider",
  title: "侧边栏",
  can_place: true,
  props: {
    style: {
      border: "1px solid #ff6600",
    },
  },
  config: {
    width: {
      text: "宽度",
      type: "number",
      defaultValue: 200
    }
  },
};
