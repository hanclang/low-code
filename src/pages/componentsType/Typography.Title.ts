export default {
  type: "Typography.Title",
  title: "标题",
  props: {
    content: "h1. Ant Design",
    style: {
      // minHeight: 20,
      // padding: "20px",
    },
  },
  config: {
    content: {
      text: "标题",
    },
    code: {
      text: "添加代码样式",
      enum: [true, false]
    },
    level: {
      text: "重要程度，相当于 h1、h2、h3、h4、h5",
      enum: [1, 2, 3, 4, 5]
    }
  },
};
