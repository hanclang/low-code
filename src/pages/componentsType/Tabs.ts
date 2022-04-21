import div from "./div";

export default {
  type: "Tabs",
  title: "标签页",
  childrenType: "Tabs.TabPane",
  // noBindEvent: true,
  props: {},
  childrens: [
    {
      type: "Tabs.TabPane",
      noBindEvent: true,
      props: {
        key: "0",
        tab: "第一个",
      },
      childrens: [
        {
          ...div,
          title: "TabPane内容",
          noDelete: true,
        },
      ],
    },
    {
      type: "Tabs.TabPane",
      noBindEvent: true,
      props: {
        key: "1",
        tab: "第二个",
      },
      childrens: [
        {
          ...div,
          title: "TabPane内容",
          noDelete: true,
        },
      ],
    },
  ],
  config: {
    size: {
      text: "大小",
      enum: ["large", "default", "small"]
    },
    centered: {
      text: "标签居中展示",
      enum: [true, false]
    },
    type: {
      text: "页签的基本样式",
      enum: ["line", "card", "editable-card"]
    },
    tabPosition: {
      text: "页签位置",
      enum: ["top", "right", "bottom", "left"]
    },
    selectData: {
      text: "TabPane数据源",
      enumobject: [
        {
          title: "tab",
          dataIndex: "tab",
          type: "String",
        },
        {
          title: "key",
          dataIndex: "key",
          type: "String",
        },
      ],
    },
  },
};
