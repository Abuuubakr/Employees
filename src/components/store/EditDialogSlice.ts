import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "./types";

type EditsliceType = {
    editDialog : boolean,
    selectedRow : Employee | null
}

const initialState : EditsliceType = {
    editDialog : false,
    selectedRow : null
}


const EditDialogStatus = createSlice({
    name : 'editDialog',
    initialState : initialState,
    reducers : {
        EditHandleClick(state, action : PayloadAction<Employee | undefined>){
            state.editDialog = !state.editDialog
            state.selectedRow = action.payload ?? null
            console.log(state.selectedRow);  
        }
    }
})


export default EditDialogStatus.reducer
export const { EditHandleClick } = EditDialogStatus.actions