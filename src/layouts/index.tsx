import React, { useState } from "react";
import { Layout, Collapse, Button, Alert, Form, Select, Input } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import antComponents from "../pages/componentsType";

import styles from "./index.less";
import { DragTag, DropContainer } from "src/components";
import { RootState } from "src/models/store";
import { keys, mapKeys } from "lodash-es";
import { updateDragData } from "src/models/dragSlice";

const { Sider, Content } = Layout;
const Panel = Collapse.Panel;

const BaseLayouts: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(true);
  const selectComponents = useSelector(
    (state: RootState) => state.drag.selectComponents
  );
  const dispatch = useDispatch();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className={styles.layout}>
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
      <Sider
        collapsedWidth={40}
        collapsible
        collapsed={!collapsed}
        trigger={null}
        className={styles.siderBackground}
        width={300}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
            onClick: toggle,
          }
        )}
        <div style={{ display: collapsed ? "block" : "none" }}>
          {selectComponents.type ? (
            <div>
              属性编辑区（{selectComponents.title}）
              <div>
                <Button
                  onClick={() => {
                    window.location.reload();
                  }}
                  style={{ marginRight: 20 }}
                >
                  清空并重新开始
                </Button>
                {selectComponents?.config ? (
                  <Form layout="vertical">
                    {keys(selectComponents.config).map((key) => {
                      const value = selectComponents.config[key];
                      if (key === "style") {
                        // TODO:
                        return null;
                      } else if (value.enumobject) {
                        // TODO:
                        return null;
                      } else {
                        return (
                          <Form.Item label={value.text} key={key}>
                            {(() => {
                              if (value.enum) {
                                return (
                                  <Select
                                    style={{ width: 120 }}
                                    value={selectComponents.props[key]}
                                    onChange={(v) => {
                                      const selectValue =
                                        v === "true"
                                          ? true
                                          : v === "false"
                                          ? false
                                          : v;
                                      dispatch(
                                        updateDragData({
                                          id: selectComponents.id,
                                          value: selectValue,
                                          key,
                                        })
                                      );
                                    }}
                                  >
                                    {value.enum.map((item: string) => (
                                      <Select.Option key={item} value={item}>
                                        {item}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                );
                              } else if (key === "content") {
                                return (
                                  <Input
                                    onChange={e => {
                                      const inputValue = e.target.value;
                                      dispatch(
                                        updateDragData({
                                          id: selectComponents.id,
                                          value: inputValue,
                                          key,
                                        })
                                      );
                                    }}
                                    value={selectComponents.props[key]}
                                  />
                                );
                              }
                              return null;
                            })()}
                          </Form.Item>
                        );
                      }
                    })}
                  </Form>
                ) : (
                  <Alert
                    message="此组件无可编辑属性"
                    type="warning"
                    style={{ marginTop: 20 }}
                  />
                )}
              </div>
            </div>
          ) : (
            <p className={styles.settingNotice}>请在左侧画布选中节点</p>
          )}
        </div>
      </Sider>
    </Layout>
  );
};

export default BaseLayouts;
