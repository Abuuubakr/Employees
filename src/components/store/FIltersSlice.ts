import { createSlice } from "@reduxjs/toolkit";

type filterType = {
  role: string;
  archive: string;
};

type filtersType = {
  filtersValue: filterType;
};

const initialState: filtersType = {
  filtersValue: { role: "all", archive: "all" },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setRoleValue(state, action){
        state.filtersValue.role = action.payload
    },
    setArchiveValue(state, action){
        state.filtersValue.archive = action.payload
    }
  },
});

export default filtersSlice.reducer
export const { setRoleValue, setArchiveValue } = filtersSlice.actions
