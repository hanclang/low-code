import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqueId } from "lodash-es";

interface InitialState {
  data: any[];
  selectComponents: any;
}

const initialState: InitialState = {
  data: [],
  selectComponents: {},
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
      break ;
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
    // action: {id, value, key}
    updateDragData: (state, action: PayloadAction<any>) => {
      const { id, key, value } = action.payload;
      const com = findUpdateCom(state.data, id);
      com.props[key] = value;
      state.selectComponents = com;
    },
    setSelectComponents: (state, action: PayloadAction<any>) => {
      state.selectComponents = action.payload;
    },
  },
  extraReducers: {},
});

export const { setDragData, updateDragData, setSelectComponents } = dragSlice.actions;

export default dragSlice.reducer;
