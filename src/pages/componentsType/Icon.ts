import * as antdIcon from "@ant-design/icons";

export default {
  type: "SyncOutlined",
  alias: "Icon",
  title: "图标",
  props: {
    // placeholder: "这是一个输入框",
    // type: "text",
    style: {
      // width:200
    },
  },
  config: {
    type: {
      text: "选择Icon(支持@ant-design/icons)",
      type: "Icon",
      updateCom: true,
      enum: Object.keys(antdIcon).filter(item => item !== "default")
    },
    spin: {
      text: "是否有旋转动画",
      enum: [true, false]
    },
    twoToneColor: {
      text: "设置双色图标的主要颜色(十六进制颜色)",
    },
    style: {
      fontSize: {
        text: "Icon大小",
      }
    }
  },
};
