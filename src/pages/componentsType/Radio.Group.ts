export default {
  type: "Radio.Group",
  title: "单选框组",
  props: {
    options: [
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
      { label: "Orange", value: "Orange" },
    ],
  },
  config: {
    optionType: {
      text: "按钮样式",
      enum: ["default", "button"],
    },
    options: {
      text: "数据源",
      enumobject: [
        {
          title: "label",
          dataIndex: "label",
          type: "String",
        },
        {
          title: "value",
          dataIndex: "value",
          type: "String",
        },
      ],
    },
  },
};
