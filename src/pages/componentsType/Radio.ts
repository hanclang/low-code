export default {
  type: "Radio",
  title: "单选框",
  wrapper: true,
  props: {
    content: "Radio"
  },
  config: {
    disabled: {
      text: "禁用 Radio",
      enum: [true, false]
    }
  }
};
