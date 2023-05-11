import {createSlice} from '@reduxjs/toolkit'
import Note from "@/components/Note";

// console.log(localStorage.getItem("listContent"))
// console.log(localStorage.getItem("listData"))


interface INFCounterNote {
    currentID: number
    listID: string
    listContent: string
    listData: string
}

const initialState: INFCounterNote = {
    currentID: localStorage.getItem("currentID") === null ? 1 : Number(localStorage.getItem("currentID")),
    listID: localStorage.getItem("listID"),
    listContent: localStorage.getItem("listContent"),
    listData: localStorage.getItem("listData")
}

export const noteSlice = createSlice({
    name: 'counterNote',
    initialState,
    reducers: {
        listNoteIncrement: (state, action) => {
            let listID = localStorage.getItem("listID");

            if (listID !== null && listID.length > 0) {
                let arrListID = localStorage.getItem("listID")?.split(",")
                let arrlistContent = localStorage.getItem("listContent")?.split("|")
                let arrlistData = localStorage.getItem("listData")?.split(",")

                arrListID.push(state.currentID)
                arrlistContent.push(action.payload.content)
                arrlistData.push(action.payload.data)


                // console.log(arrListID)
                localStorage.setItem("listID", arrListID.join(','))
                localStorage.setItem("listContent", arrlistContent.join('|'))
                localStorage.setItem("listData", arrlistData.join(','))
            } else {
                localStorage.setItem("listID", state.currentID)
                localStorage.setItem("listContent", action.payload.content)
                localStorage.setItem("listData", action.payload.data)
            }
            state.currentID = Number(state.currentID) + 1
            localStorage.setItem("currentID", state.currentID)
        },
        listNoteDecrement: (state, action) => {
            const currentID = action.payload.id
            const listID = []
            const listContent = []
            const listData = []

            let listNote = action.payload.listNote

            listNote.filter((item) => {
                    if (item.id === currentID) {
                        // console.log("Я НАШЕЛ id: " + currentID)
                    } else {
                        listID.push(item.id)
                        listContent.push(item.content)
                        listData.push(item.data)
                    }
                },
            )

            localStorage.setItem("listID", listID.join(','))
            localStorage.setItem("listContent", listContent.join('|'))
            localStorage.setItem("listData", listData.join(','))
        },
    },
})

// Action creators are generated for each case reducer function
export const {listNoteIncrement, listNoteDecrement} = noteSlice.actions

export default noteSlice.reducer