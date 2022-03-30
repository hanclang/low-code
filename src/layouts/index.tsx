import React from "react";
import { Layout, Collapse } from "antd";

import antComponents from "../pages/antdComponents";

import styles from "./index.less";
import { DragTag, DropContainer } from "src/components";

const { Sider, Content } = Layout;
const Panel = Collapse.Panel;

const BaseLayouts: React.FC<any> = () => (
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
  </Layout>
);

export default BaseLayouts;
