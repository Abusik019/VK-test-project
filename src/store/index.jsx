import { configureStore } from "@reduxjs/toolkit";
import films from './slices/films'

export const store = configureStore({
    reducer: {
        films,
    }
})