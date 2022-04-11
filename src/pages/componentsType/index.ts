import Layout from "./Layout";
import Layout_Header from "./Layout.Header";
import Layout_Sider from "./Layout.Sider";
import Layout_Content from "./Layout.Content";
import Button from "./Button";
import div from "./div";
import Row2 from "./Row2";
import Row4 from "./Row4";
import Row8 from "./Row8";
import Divider from "./Divider";
import Switch from "./Switch";
import Space from "./Space";
import Row from "./Row";
import Col from "./Col";
import Form from "./Form";
import Form_Item from "./Form.Item";
import Input from "./Input";
import Input_TextArea from "./Input.TextArea";

export default [
  {
    group_title: "栅格组件（横向百分比）",
    components: [div, Row, Col, Row2, Row4, Row8, {
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
    },],
  },
  {
    group_title: "布局",
    components: [
      Layout,
      Layout_Header,
      Layout_Sider,
      Layout_Content,
      Divider,
      Space,
    ],
  },
  {
    group_title: "通用",
    components: [Button],
  },
  {
    group_title: "数据录入",
    components: [Switch, Form, Form_Item, Input, Input_TextArea],
  },
];
