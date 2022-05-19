import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Layout, Button, Image, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import logoPng from "src/assets/logo.png";
import { resetDragData } from "src/models/dragSlice";
import { RootState } from "src/models/store";
import { GithubOutlined } from "@ant-design/icons";
import { cloneDeep } from "lodash-es";

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

  const renderProps = (props: any, d: any) => {
    let result = "";
    // eslint-disable-next-line no-param-reassign
    props = cloneDeep(props);
    for (let i in props) {
      if (!(/^on[A-Z]/.test(i) || /draggable/.test(i) || /content/.test(i))) {
        if (/^event_(.*?)/.test(i)) {
          result += ` ${i.replace("event_", "")}={()=>{ }}`;
        } else if (typeof props[i] === "object" && props[i].type === "relative") {
          result += ` ${i}={${JSON.stringify(
            props[props[i].target] ? props[i].true : props[i].false
          )}}`;
        } else if (d.sub_type === "table_container" && i === "columns") {
          let renderCache: any = {};
          props[i].forEach((p: any, pi: any) => {
            if (p.childrens) {
              // var indentCache = indent_space;
              // indent_space = "";

              renderCache[
                "$$" + pi + "$$"
              ] = `()=>{ return ${renderElementtoJSX(p.childrens).replace(
                /\n {4}/,
                ""
              )}}`;
              // indent_space = indentCache;
              p.render = "$$" + pi + "$$";
              delete p.childrens;
            }
          });
          let noindent = JSON.stringify(props[i]);
          let indent = JSON.stringify(props[i], null, 2);
          let r = noindent.length > 100 ? indent : noindent;
          // eslint-disable-next-line guard-for-in
          for (let m in renderCache) {
            r = r.replace(`"${m}"`, renderCache[m]);
          }
          result += ` ${i}={${r}}`;
        } else if (typeof props[i] === "object" && props[i].type === "function") {
          result += `  ${i}={(item) => item.title}`; // Transfer
        } else {
          let noindent = JSON.stringify(props[i]);
          let indent = JSON.stringify(props[i], null, 2);
          result += ` ${i}={${noindent?.length > 100 ? indent : noindent}}`;
        }
      }
    }
    return result;
  };

  const renderElementtoJSX = (data: any[], indent_space = "") => {
    let result = "";
    // indent_space += "  ";
    data.forEach((d) => {
      if (d.hasDelete) return;
      result += `${indent_space}<${d.type}${renderProps(d.props, d)}>${
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
