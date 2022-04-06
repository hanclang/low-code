import Layout from "./Layout";
import Layout_Header from "./Layout.Header";
import Layout_Sider from "./Layout.Sider";
import Layout_Content from "./Layout.Content";
import Button from "./Button";
import div from "./div";
import Row2 from "./Row2";
import Row4 from "./Row4";
import Row8 from "./Row8";

export default [
  {
    group_title: "栅格组件（横向百分比）",
    components: [Row2, Row4, Row8],
  },
  {
    group_title: "布局容器组件",
    components: [
      div,
      Layout,
      Layout_Header,
      Layout_Sider,
      Layout_Content,
      {
        type: "div",
        title: "分割线",
        is_native: true,
        props: {
          style: {
            backgroundColor: "#bbb",
            height: "1px",
          },
        },
        config: {
          backgroundColor: {
            text: "背景色",
          },
          margin: {
            text: "外边距",
            type: "4-value",
          },
        },
      },
    ],
  },
  {
    group_title: "表单容器和表单项",
    components: [Button],
  },
];
