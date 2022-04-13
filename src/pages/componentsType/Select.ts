export default {
  type: "Select",
  title: "选择器",
  childrens: [
    {
      type: "Select.Option",
      noBindEvent: true,
      props: {
        key: "1",
        value: "第一个",
      }
    },
    {
      type: "Select.Option",
      noBindEvent: true,
      props: {
        key: "2",
        value: "第二个",
      }
    },
  ],
  props: {
    mode: "",
    placeholder: "请选择",
    style: {},
  },
  config: {
    style: {
      width: {
        text: "宽度",
      },
    },
    value: {
      text: "默认值",
    },
    mode: {
      text: "类型",
      enum: ["multiple", "tags", "combobox"],
    },
    selectData: {
      text: "数据源",
      enumobject: [
        {
          title: "文本",
          dataIndex: "value",
          type: "String",
        },
        {
          title: "真实值",
          dataIndex: "key",
          type: "String",
        },
      ],
    },
  },
};
