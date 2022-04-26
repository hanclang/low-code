export default {
  type: "Checkbox.Group",
  title: "复选框",
  props: {
    options: [
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
      { label: "Orange", value: "Orange" },
    ],
  },
  config: {
    disabled: {
      text: "整组失效",
      enum: [true, false]
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
