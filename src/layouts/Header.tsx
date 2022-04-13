import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Layout, Button, Image, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import logoPng from "src/assets/logo.png";
import { resetDragData } from "src/models/dragSlice";
import { RootState } from "src/models/store";
import { GithubOutlined } from "@ant-design/icons";

const { Header } = Layout;
const LayoutHeader: React.FC = () => {
  const dispatch = useDispatch();
  const dragData = useSelector((state: RootState) => state.drag.data);
  const [visible, setVisible] = useState(false);

  const reset = () => {
    dispatch(resetDragData());
  };

  const renderJSONtoJSX = () => {
    return `import React from 'react';

const Index = () => {
  return <>
    ${renderElementtoJSX(dragData)}
  </>
}
export default Index;

`;
  };

  const renderElementtoJSX = (data: any[], indent_space = "") => {
    let result = "";
    // indent_space += "  ";
    data.forEach((d) => {
      if (d.hasDelete) return;
      result += `${indent_space}<${d.type}>${
        d.props.content
          ? [d.props.content]
          : d.childrens
          // eslint-disable-next-line no-useless-concat
          ? "\n    " + renderElementtoJSX(d.childrens, indent_space + "  ")
          : ""
      }</${d.type}>
    `;
    });
    // eslint-disable-next-line no-param-reassign
    indent_space = indent_space.replace("  ", "");

    result += `${indent_space}`;
    return result;
  };

  return (
    <>
      <Header>
        <Image height={35} preview={false} src={logoPng} />
        <Space>
          <Button onClick={reset}>重置页面</Button>
          <Button onClick={() => setVisible(true)} type="primary">出码</Button>
          <a target="_blank" href="https://github.com/hanclang/low-code" style={{color: "#333"}}><GithubOutlined style={{fontSize: 24}} /></a>
        </Space>
      </Header>
      <Modal width={750} onCancel={() => setVisible(false)} title="代码预览" visible={visible} forceRender>
        <SyntaxHighlighter showLineNumbers language="javascript" style={docco}>
          {renderJSONtoJSX()}
        </SyntaxHighlighter>
      </Modal>
    </>
  );
};

export default LayoutHeader;
