import React from "react";
import { Layout, Collapse } from "antd";
import antComponents from "../pages/componentsType";

import styles from "./index.less";
import { DragTag, DropContainer } from "src/components";
import LayoutHeader from "./Header";
import RightSider from "./RightSider";


const { Sider, Content } = Layout;
const Panel = Collapse.Panel;

const BaseLayouts: React.FC<any> = () => {


  return (
    <Layout className={styles.layout}>
      <LayoutHeader />
      <Layout>
      <Sider width={300} className={styles.leftSider}>
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
      <RightSider />
      </Layout>
    </Layout>
  );
};

export default BaseLayouts;
