import React, { useState } from "react";
import { Layout, Button, Alert, Form, Select, Input } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import styles from "./index.less";
import { RootState } from "src/models/store";
import { keys, mapKeys } from "lodash-es";
import { deleteDragComponent, setSelectComponents, updateDragData } from "src/models/dragSlice";

const { Sider } = Layout;

const RightSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const selectComponents = useSelector(
    (state: RootState) => state.drag.selectComponents
  );
  const dispatch = useDispatch();

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider
      collapsedWidth={40}
      collapsible
      collapsed={!collapsed}
      trigger={null}
      className={styles.siderBackground}
      width={300}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: toggle,
      })}
      <div style={{ display: collapsed ? "block" : "none" }}>
        {selectComponents.type ? (
          <div>
            属性编辑区（{selectComponents.title}）
            <div>
              <Button
                onClick={() => {
                  dispatch(deleteDragComponent({id: selectComponents.id}));
                  dispatch(setSelectComponents({}));
                }}
                style={{ marginRight: 20, marginTop: 10 }}
              >
                删除组件
              </Button>
              {selectComponents?.config ? (
                <Form layout="vertical">
                  {keys(selectComponents.config).map((key) => {
                    const value = selectComponents.config[key];
                    if (key === "style") {
                      // TODO:
                      const style = selectComponents.config.style;
                      return Object.keys(style).map((styleKey, index) => {
                        if (style[styleKey].type === "4-value") {
                          let styleValue: any[];
                          let defaultValue: string =
                            selectComponents.props?.style?.[styleKey] || "0";
                          if (defaultValue.includes(" ")) {
                            styleValue = defaultValue.split(" ");
                          } else {
                            styleValue = Array.from({ length: 4 }).fill(
                              defaultValue
                            );
                          }
                          // TODO: 抽取组件
                          return (
                            <Form.Item key={index} label={value[styleKey].text}>
                              上：
                              <Input
                                value={styleValue[0]}
                                onChange={(v) => {
                                  styleValue[0] = v.target.value;
                                  dispatch(
                                    updateDragData({
                                      id: selectComponents.id,
                                      value: styleValue.join(" "),
                                      key: "style",
                                      subKey: styleKey,
                                    })
                                  );
                                }}
                                style={{ width: 100, marginRight: 5 }}
                              />
                              右：
                              <Input
                                value={styleValue[1]}
                                onChange={(v) => {
                                  styleValue[1] = v.target.value;
                                  dispatch(
                                    updateDragData({
                                      id: selectComponents.id,
                                      value: styleValue.join(" "),
                                      key: "style",
                                      subKey: styleKey,
                                    })
                                  );
                                }}
                                style={{ width: 100, marginRight: 5 }}
                              />
                              <div> </div>
                              下：
                              <Input
                                value={styleValue[2]}
                                onChange={(v) => {
                                  styleValue[2] = v.target.value;
                                  dispatch(
                                    updateDragData({
                                      id: selectComponents.id,
                                      value: styleValue.join(" "),
                                      key: "style",
                                      subKey: styleKey,
                                    })
                                  );
                                }}
                                style={{ width: 100, marginRight: 5 }}
                              />
                              左：
                              <Input
                                value={styleValue[3]}
                                onChange={(v) => {
                                  styleValue[3] = v.target.value;
                                  dispatch(
                                    updateDragData({
                                      id: selectComponents.id,
                                      value: styleValue.join(" "),
                                      key: "style",
                                      subKey: styleKey,
                                    })
                                  );
                                }}
                                style={{ width: 100 }}
                              />
                            </Form.Item>
                          );
                        }
                        return null;
                      });
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
                                      {String(item)}
                                    </Select.Option>
                                  ))}
                                </Select>
                              );
                            } else {
                              return (
                                <Input
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    dispatch(
                                      updateDragData({
                                        id: selectComponents.id,
                                        value: inputValue,
                                        key,
                                        type: value.valueType || ""
                                      })
                                    );
                                  }}
                                  value={selectComponents.props[key]}
                                />
                              );
                            }
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
  );
};

export default RightSider;