export default {
  type: "Steps",
  childrenType: "Steps.Step",
  title: "步骤条",
  childrens: [
    {
      type: "Steps.Step",
      noBindEvent: true,
      props: {
        title: "Finished",
        description: "This is a description",
      }
    },
    {
      type: "Steps.Step",
      noBindEvent: true,
      props: {
        title: "In Progress",
        description: "This is a description",
      }
    },
    {
      type: "Steps.Step",
      noBindEvent: true,
      props: {
        title: "Waiting",
        description: "This is a description",
      }
    },
  ],
  props: {
    current: 1,
    placeholder: "请选择",
    style: {},
  },
  config: {
    current: {
      text: "当前步骤",
      type: "number"
    },
    direction: {
      text: "骤条方向",
      enum: ["horizontal", "vertical"]
    },
    type: {
      text: "步骤条类型",
      enum: ["default", "navigation"],
    },
    progressDot: {
      text: "点状步骤条",
      enum: [true, false],
    },
    selectData: {
      text: "数据源",
      enumobject: [
        {
          title: "标题",
          dataIndex: "title",
          type: "String",
        },
        {
          title: "步骤的详情描述",
          dataIndex: "description",
          type: "String",
        },
      ],
    },
  },
};
