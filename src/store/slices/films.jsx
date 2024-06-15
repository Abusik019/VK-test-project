import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2";

const HEADERS = {
    headers: {
        'X-API-KEY': '02493d2d-4117-4028-a107-cf709c808aa9'
    }
};

const initialState = {
    list: [],
    genres: [],
    loading: false,
    error: null,
};

// middleware (thunk)
export const getFilms = createAsyncThunk("films/getFilms", async (page) => {
    const page1Response = await axios.get(`${API_URL}/films?page=${page}`, HEADERS);
    const page2Response = await axios.get(`${API_URL}/films?page=${page + 1}`, HEADERS);

    if (page1Response.status !== 200 || page2Response.status !== 200) {
        throw new Error("Error fetching movies");
    }

    return {
        items: [...page1Response.data.items, ...page2Response.data.items],
        total: page1Response.data.total
    };
});

export const getFilmById = createAsyncThunk("films/getFilmById", async (filmId) => {
    const response = await axios.get(`${API_URL}/movie/${filmId}`, HEADERS);

    if (response.status !== 200) {
        throw new Error("Error fetching movie");
    }

    return response.data;
});

export const getGenres = createAsyncThunk('films/getGenres', async () => {
    const response = await axios.get(`${API_URL}/films/filters`, HEADERS);

    if (response.status !== 200) {
        throw new Error("Error fetching genres");
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

        //getGenres
        builder.addCase(getGenres.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getGenres.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
