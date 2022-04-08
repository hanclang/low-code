export default {
  type: "Switch",
  title: "开关",
  props: {
    size: "default",
    checked: false,
    disabled: false,
  },
  config: {
    size: {
      text: "大小",
      enum: ["default", "small"],
    },
    checked: {
      text: "指定当前是否选中",
      enum: [true, false],
    },
    disabled: {
      text: "是否禁用",
      enum: [true, false],
    }
  },
};
