import {configureStore} from '@reduxjs/toolkit'
import counterNoteReducer from '../Slice/noteSlice'

export const store = configureStore({
    reducer: {
        counterNoteReducer: counterNoteReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

