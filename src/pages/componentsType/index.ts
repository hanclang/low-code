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
import Icon from "./Icon";
import Typography_Title from "./Typography.Title";
import Typography_Text from "./Typography.Text";
import Typography_Link from "./Typography.Link";
import Select from "./Select";

export interface ComponentProps {
  id?: string;
  type: string;
  childrenType?: string;
  title: string;
  alias?: string;
  is_native?: boolean;
  can_place?: boolean;
  childrens?: Partial<ComponentProps>[];
  props: {
    [propName: string]: any;
  };
  config?: {
    [propName: string]: any;
  };
}
interface ComponentsProps {
  group_title: string;
  components: ComponentProps[];
}
const components: ComponentsProps[] = [
  {
    group_title: "栅格组件（横向百分比）",
    components: [
      div,
      Row,
      Col,
      Row2,
      Row4,
      Row8,
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
    components: [Button, Icon, Typography_Title, Typography_Text, Typography_Link],
  },
  {
    group_title: "数据录入",
    components: [Switch, Form, Form_Item, Input, Input_TextArea, Select],
  },
];

export default components;
