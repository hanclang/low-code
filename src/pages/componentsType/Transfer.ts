export default {
  type: "Transfer",
  title: "穿梭框",
  props: {
    render: (item: any) => item?.title,
    dataSource: [
      {
        key: "0",
        title: "content1",
        description: "description of content1",
      },
      {
        key: "1",
        title: "content2",
        description: "description of content2",
      },
      {
        key: "2",
        title: "content3",
        description: "description of content3",
      },
      {
        key: "3",
        title: "content4",
        description: "description of content4",
      },
      {
        key: "4",
        title: "content5",
        description: "description of content5",
      },
      {
        key: "5",
        title: "content6",
        description: "description of content6",
      },
      {
        key: "6",
        title: "content7",
        description: "description of content7",
      },
      {
        key: "7",
        title: "content8",
        description: "description of content8",
      },
      {
        key: "8",
        title: "content9",
        description: "description of content9",
      },
      {
        key: "9",
        title: "content10",
        description: "description of content10",
      },
      {
        key: "10",
        title: "content11",
        description: "description of content11",
      },
    ],
  },
  config: {
    dataSource: {
      text: "数据源",
      enumobject: [
        {
          title: "key",
          dataIndex: "key",
          type: "String",
        },
        {
          title: "title",
          dataIndex: "title",
          type: "String",
        },
        {
          title: "description",
          dataIndex: "description",
          type: "String",
        },
      ],
    },
  },
};
