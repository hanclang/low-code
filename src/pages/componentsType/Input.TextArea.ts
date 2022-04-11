export default {
  type: "Input.TextArea",
  title: "文本框",
  props: {
    placeholder: "这是一个文本框",
    type: "text",
    style: {
      // width:200
    },
  },
  config: {
    placeholder: {
      text: "这是一个文本框",
    },
    style: {
      width: {
        text: "宽度",
      },
    },
  },
};
