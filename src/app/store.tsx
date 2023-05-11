import {configureStore} from '@reduxjs/toolkit'
import counterNoteReducer from '../Slice/noteSlice'

export default configureStore({
    reducer: {
        counterNoteReducer: counterNoteReducer,
    },
})

