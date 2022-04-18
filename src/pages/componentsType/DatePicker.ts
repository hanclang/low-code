export default {
  type: "DatePicker",
  title: "日期选择器",
  wrap: true,
  props: {
    style: {
      width: "200px",
    },
  },
  config: {
    style: {
      width: {
        text: "宽度",
      },
    },
    picker: {
      text: "选择器类型",
      enum: ["date", "week", "month", "quarter", "year"]
    }
  },
};
