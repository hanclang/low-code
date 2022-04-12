import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqueId } from "lodash-es";

interface InitialState {
  data: any[];
  selectComponents: any;
  mouseMoveCom: any;
}

const initialState: InitialState = {
  data: [],
  selectComponents: {},
  mouseMoveCom: {},
};

/**
 * 为每个组件标识唯一id
 * @param data
 */
const setId = (data: any[]) => {
  data.forEach((item) => {
    if (!item.id) item.id = uniqueId("com");
    if (item.childrens && Array.isArray(item.childrens)) {
      setId(item.childrens);
    }
  });
};

const findUpdateCom = (data: any[], id: string): any => {
  let com;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      com = data[i];
      break;
    }
    if (data[i].childrens && Array.isArray(data[i].childrens)) {
      com = findUpdateCom(data[i].childrens, id);
    }
  }
  return com;
};

export const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    setDragData: (state, action: PayloadAction<any>) => {
      // TODO: 复杂数据存储
      state.data.push(action.payload);
      setId(state.data);
    },
    resetDragData: (state) => {
      state.data = [];
    },
    deleteDragComponent: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      const com = findUpdateCom(state.data, id);
      com.hasDelete = true;
    },
    // action: {id, value, key, type}
    updateDragData: (state, action: PayloadAction<any>) => {
      // type 转换输入类型
      const { id, key, value, subKey, type, updateCom } = action.payload;
      const com = findUpdateCom(state.data, id);
      let v;
      if (type === "number") {
        v = Number(value);
      } else {
        v = value;
      }
      if (updateCom) { // 更新组件类型
        com[key] = v;
      } else if (subKey) { // 更新组件属性
        const style = com.props[key] || {};
        com.props[key] = { ...style, [subKey]: v};
      } else {
        com.props[key] = v;
      }
      state.selectComponents = com;
    },
    updateChildren: (state, action: PayloadAction<any>) => {
      const { id, dragData, value } = action.payload;
      const com = findUpdateCom(state.data, id);
      if (com.childrens) {
        com.childrens.push(dragData);
      } else {
        com.childrens = [dragData];
      }
      setId(com.childrens);
    },
    setSelectComponents: (state, action: PayloadAction<any>) => {
      state.selectComponents = action.payload;
    },
    setMouseMoveCom: (state, action: PayloadAction<any>) => {
      state.mouseMoveCom = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setDragData,
  resetDragData,
  deleteDragComponent,
  updateDragData,
  setSelectComponents,
  setMouseMoveCom,
  updateChildren,
} = dragSlice.actions;

export default dragSlice.reducer;
