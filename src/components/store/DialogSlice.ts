import { createSlice } from "@reduxjs/toolkit";

export type sliceType = {
    dialog : boolean
}

const initialState : sliceType = {
    dialog : false
}


const DialogStatus = createSlice({
    name : 'dialog',
    initialState : initialState,
    reducers : {
        handleClick(state){
            state.dialog = !state.dialog
        }
    }
})


export default DialogStatus.reducer
export const { handleClick } = DialogStatus.actions