import  { configureStore } from "@reduxjs/toolkit";
import tableSlice from './TableSlice'
import DialogStatus from './DialogSlice'
import EditDialogStatus from "./EditDialogSlice";
import filtersValue from './FIltersSlice'

const store = configureStore({
    reducer : {
        table : tableSlice,
        dialog : DialogStatus,
        EditDialog : EditDialogStatus,
        filters : filtersValue
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;