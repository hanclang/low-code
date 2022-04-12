import React, { useState } from "react";
import { Layout, Button, Alert, Form, Select, Input } from "antd";
import * as antdIcons from "@ant-design/icons";
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
      {React.createElement(collapsed ? antdIcons.MenuUnfoldOutlined : antdIcons.MenuFoldOutlined, {
        className: styles.trigger,
        onClick: toggle,
      })}
      <div style={{ display: collapsed ? "block" : "none", overflow: "auto", paddingBottom: 10 }}>
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
                        let defaultValue: string =
                            selectComponents.props?.style?.[styleKey];
                        if (style[styleKey].type === "4-value") {
                          let styleValue: any[];
                          if (defaultValue?.includes(" ")) {
                            styleValue = defaultValue.split(" ");
                          } else {
                            styleValue = Array.from({ length: 4 }).fill(
                              defaultValue || "0"
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
                        } else {
                          return <Form.Item key={index} label={value[styleKey].text}>
                            <Input
                              placeholder="请输入"
                              value={defaultValue}
                              onChange={(v) => {
                                dispatch(
                                  updateDragData({
                                    id: selectComponents.id,
                                    value: v.target.value,
                                    key: "style",
                                    subKey: styleKey,
                                  })
                                );
                              }}
                            />
                          </Form.Item>;
                        }
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
                                  optionLabelProp={value.type === "Icon" ? "value" : "children"}
                                  placeholder="请选择"
                                  showSearch
                                  filterOption={(input, option) =>
                                    String(option?.value).toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
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
                                        updateCom: value.updateCom,
                                      })
                                    );
                                  }}
                                >
                                  {value.enum.map((item: string) => {
                                    if (value.type === "Icon") {
                                      return (
                                        <Select.Option key={item} value={item}>
                                          <div style={{display: "flex", justifyContent: "space-between"}}>
                                            {String(item)}
                                            <span>
                                              {React.createElement((antdIcons as any)[item])}
                                            </span>
                                          </div>
                                        </Select.Option>
                                      );
                                    }
                                    return (
                                      <Select.Option key={item} value={item}>
                                        {String(item)}
                                      </Select.Option>
                                    );
                                  })}
                                </Select>
                              );
                            } else {
                              const isJson = typeof selectComponents.props[key] === "object"
                                && selectComponents.props[key]?.type === "json";
                              return (
                                <Input
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    dispatch(
                                      updateDragData({
                                        id: selectComponents.id,
                                        value: inputValue,
                                        key,
                                        subKey: isJson ? "value" : "",
                                        type: value.valueType || ""
                                      })
                                    );
                                  }}
                                  value={isJson
                                    ? selectComponents.props[key].value
                                    : selectComponents.props[key]
                                  }
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
