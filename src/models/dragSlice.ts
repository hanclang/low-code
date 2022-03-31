import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  data: any[];
}

const initialState: InitialState = {
  data: [],
};

export const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    setDragData: (state, action: PayloadAction<any>) => {
      // TODO: 复杂数据存储
      state.data.push(action.payload);
    },
  },
  extraReducers: {},
});

export const { setDragData } = dragSlice.actions;

export default dragSlice.reducer;
