import React, { useState } from "react";
import { Layout, Collapse } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import antComponents from "../pages/componentsType";

import styles from "./index.less";
import { DragTag, DropContainer } from "src/components";

const { Sider, Content } = Layout;
const Panel = Collapse.Panel;

const BaseLayouts: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className={styles.layout}>
      <Sider width={300}>
        <Collapse>
          {antComponents.map((group, i) => {
            return (
              <Panel
                key={i + 1}
                header={group.group_title + " " + group.components.length}
              >
                {group.components.map((component, i2) => {
                  return (
                    <DragTag
                      draggingData={component}
                      tagName={`${component.type} ${component.title}`}
                      key={String(i) + i2}
                    />
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </Sider>
      <Content>
        <DropContainer />
      </Content>
      <Sider collapsedWidth={40} collapsible collapsed={!collapsed} trigger={null} className={styles.siderBackground} width={300}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
            onClick: toggle,
          }
        )}
      </Sider>
    </Layout>
  );
};

export default BaseLayouts;
