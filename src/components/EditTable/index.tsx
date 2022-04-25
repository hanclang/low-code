import React, { useState } from "react";
import { Table, Input, InputNumber, Form, Typography, Button } from "antd";
import { useDispatch } from "react-redux";
import { updateChildren, updateDragChildren, updateDragData } from "src/models/dragSlice";
import div from "src/pages/componentsType/div";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: any) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({propsKey, data = [], columns = [], id = "", childrenType}: any) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const dispatch = useDispatch();

  const isEditing = (record: any) => record.index === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.index);
  };

  const add = () => {
    const props: any = {};
    columns.forEach((item: any) => {
      props[item.dataIndex] = item.dataIndex;
    });
    if (childrenType) { // 更新像select那样的组件
      if (childrenType === "Image") {
        props.preview = false;
      }
      let dragData: Record<string, any> = {
        type: childrenType,
        noBindEvent: true,
        props,
      };
      if (childrenType === "Tabs.TabPane") {
        dragData.childrens = [{
          ...div,
          title: "TabPane内容",
          noDelete: true
        }];
      }
      dispatch(updateChildren({
        id,
        dragData
      }));
    } else {
      dispatch(updateDragData({
        id,
        value: props,
        type: "Array",
        key: propsKey
      }));
    }

  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: number) => {
    try {
      const row = await form.validateFields();
      if (childrenType) { // 更新像select那样的组件
        dispatch(updateDragChildren({
          id,
          index: key,
          row
        }));
      } else {
        dispatch(updateDragData({
          id,
          value: row,
          type: "updateArray",
          key: propsKey,
          index: key,
        }));
      }

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteByKey = (key: number) => {
    dispatch(updateDragChildren({
      id,
      index: key,
    }));
  };

  const op = {
    title: "操作",
    dataIndex: "operation",
    editable: true,
    fixed: "right",
    render: (_: any, record: any, index: number) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(index)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Typography.Link onClick={cancel}>Cancel</Typography.Link>
        </span>
      ) : (
        <span>
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
            style={{
              marginRight: 8,
            }}
          >
            Edit
          </Typography.Link>
          <Typography.Link disabled={editingKey !== ""} onClick={() => deleteByKey(index)}>Delete</Typography.Link>
        </span>
      );
    },
  };
  const newColumns = [...columns, op];
  const mergedColumns = newColumns.map((col: any) => {
    if (col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowKey="index"
        pagination={false}
        scroll={{x: "max-content"}}
      />
      <Button onClick={add} style={{marginTop: 8}} type="primary" block>Add</Button>
    </Form>
  );
};

export default EditableTable;
