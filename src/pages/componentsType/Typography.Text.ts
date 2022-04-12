export default {
  type: "Typography.Text",
  title: "文本",
  props: {
    content: "Ant Design",
    style: {
      // minHeight: 20,
      // padding: "20px",
    },
  },
  config: {
    content: {
      text: "文本内容",
    },
    code: {
      text: "添加代码样式",
      enum: [true, false]
    },
    type: {
      text: "文本类型",
      enum: ["secondary", "success", "warning", "danger"]
    }
  },
};
