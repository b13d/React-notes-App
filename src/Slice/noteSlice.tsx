import {createSlice} from '@reduxjs/toolkit'

type TypeListData = {
    id: string[],
    content: string[],
    data: string[]
}

type TypeData = {
    currentID: number
    listData: string
    listContent: string
}

interface INFCounterNote {
    currentID: number
    listID: string
    listContent: string
    listData: string
}

const initialState: INFCounterNote = {
    currentID: localStorage.getItem("currentID").length === 0 ? 1 : Number(localStorage.getItem("currentID")),
    listID: localStorage.getItem("listID"),
    listContent: localStorage.getItem("listContent"),
    listData: localStorage.getItem("listData")
}

export const noteSlice = createSlice({
    name: 'counterNote',
    initialState,
    reducers: {
        listNoteIncrement: (state:TypeData, action) => {
            let listID = localStorage.getItem("listID");

            if (listID !== "" && listID.length > 0) {
                let arrListID = localStorage.getItem("listID")?.split(",")
                let arrlistContent = localStorage.getItem("listContent")?.split("|")
                let arrlistData = localStorage.getItem("listData")?.split(",")

                arrListID.push(state.currentID.toString())
                arrlistContent.push(action.payload.listContent)
                arrlistData.push(action.payload.listData)




                // console.log(arrListID)
                localStorage.setItem("listID", arrListID.join(','))
                localStorage.setItem("listContent", arrlistContent.join('|'))
                localStorage.setItem("listData", arrlistData.join(','))
            } else {
                localStorage.setItem("listID", state.currentID.toString())
                localStorage.setItem("listContent", action.payload.listContent)
                localStorage.setItem("listData", action.payload.listData)
            }
            state.currentID = Number(state.currentID) + 1
            localStorage.setItem("currentID", state.currentID.toString())
        },
        listNoteDecrement: (state, action) => {
            const currentID = action.payload.id
            const listID = []
            const listContent = []
            const listData = []

            let listNote:TypeListData = action.payload.listNote

            listNote.id.filter((item,index) => {
                    if (item === currentID) {
                    } else {
                        listID.push(listNote.id[index])
                        listContent.push(listNote.content[index])
                        listData.push(listNote.data[index])
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