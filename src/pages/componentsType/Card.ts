export default {
  type: "Card",
  title: "卡片",
  can_place: true,
  props: {
    title: "标题",

  },
  config: {
    style: {
      width: {
        text: "宽度",
      },
    },
    title: {
      text: "卡片标题"
    },
    size: {
      text: "card 的尺寸",
      enum: ["default", "small"]
    },
    loading: {
      text: "展示一个占位",
      enum: [true, false]
    },
    hoverable: {
      text: "鼠标移过时可浮起",
      enum: [true, false]
    },
    bordered: {
      text: "是否有边框",
      enum: [true, false]
    },
    cover: {
      text: "是否有封面",
      FormItemType: "Switch",
      enum: [true, false]
    }
  }
};
