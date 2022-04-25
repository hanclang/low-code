export default {
  type: "Carousel",
  title: "轮播图",
  childrenType: "Image",
  props: {
    autoplay: true
  },
  childrens: [
    {
      type: "Image",
      noBindEvent: true,
      props: {
        preview: false,
        src: "https://desk-fd.zol-img.com.cn/g2/M00/04/07/Cg-4WlWI0dGIbiyEAAIxyAQA6pQAAF1mAHKJKcAAjHg239.jpg"
      },
    },
    {
      type: "Image",
      noBindEvent: true,
      props: {
        preview: false,
        src: "https://desk-fd.zol-img.com.cn/g2/M00/04/07/Cg-4WlWI0gGIR_psAAM_Ry5krRIAAF1mgBV-tgAAz9f570.jpg"
      }
    }
  ],
  config: {
    dots: {
      text: "是否显示面板指示点",
      enum: [true, false]
    },
    autoplay: {
      text: "是否自动切换",
      enum: [true, false]
    },
    dotPosition: {
      text: "面板指示点位置",
      enum: ["top", "bottom", "left", "right"]
    },
    selectData: {
      text: "轮播图地址",
      enumobject: [
        {
          title: "图片地址",
          dataIndex: "src",
          type: "String",
        },
      ],
    },
  },
};
