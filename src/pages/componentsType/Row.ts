export default {
  type: "Row",
  title: "行",
  can_place: true,
  props: {
    style: {
      minHeight: 30
    }
  },
  config: {
    gutter: {
      text: "栅格间隔(number)",
      valueType: "number"
    },
    align: {
      text: "垂直对齐方式",
      enum: ["top", "middle", "bottom"],
    },
    justify: {
      text: "水平排列方式",
      enum: ["start", "end", "center", "space-around", "space-between"],
    },
    wrap: {
      text: "是否自动换行",
      enum: [true, false],
    },
  },
};
