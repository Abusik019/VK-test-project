import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const API_URL = "https://api.kinopoisk.dev/v1.4";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

// middleware (thunk)
export const getFilms = createAsyncThunk("films/getFilms", async () => {
    const response = await axios.get(`${API_URL}/movie?page=1&limit=50`, {
        headers: {
            'accept': 'application/json',
            'X-API-KEY': '6PG341V-R2GM4HD-J2E7G8Z-BBM4B47'
        }
    });

    if (response.status !== 200) {
        throw new Error("Error fetching movies");
    }

    return response.data;
});

export const getFilmById = createAsyncThunk("films/getFilmById", async (filmId) => {
    const response = await axios.get(`${API_URL}/movie/${filmId}`, {
        headers: {
            'accept': 'application/json',
            'X-API-KEY': '6PG341V-R2GM4HD-J2E7G8Z-BBM4B47'
        }
    });

    if (response.status !== 200) {
        throw new Error("Error fetching movie");
    }

    return response.data;
});

const filmsSlice = createSlice({
    name: "films",
    initialState,
    reducers: {
        setFilms: (state, action) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        // getFilms
        builder.addCase(getFilms.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getFilms.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getFilms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // getFilmById
        builder.addCase(getFilmById.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getFilmById.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getFilmById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
