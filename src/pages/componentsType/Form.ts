import Common_Style from "./common/style.config";
export default {
  type: "Form",
  title: "表单容器",
  can_place: true,
  props: {
    layout: "horizontal",
    labelCol: {
      value: "{\"span\":4}",
      type: "json"
    },
    wrapperCol: {
      value: "{\"span\":20}",
      type: "json"
    },
    style: {
      padding: "20px",
      margin: "0px",
    },
  },
  config: {
    layout: {
      text: "布局方式",
      enum: ["inline", "horizontal", "vertical"],
    },
    colon: {
      text: "是否显示 label 后面的冒号",
      enum: [true, false],
    },
    labelAlign: {
      text: "label 标签的文本对齐方式",
      enum: ["left", "right"],
    },
    labelCol: {
      text: "label 标签布局",
      subKey: "value"
    },
    wrapperCol: {
      text: "输入控件设置布局",
      valueType: "json"
    },
    style: {
      width: {
        text: "宽度",
      },
      padding: {
        text: "内边距",
        type: "4-value",
      },
      margin: {
        text: "外边距",
        type: "4-value",
      },
      ...Common_Style,
    },
  },
};
