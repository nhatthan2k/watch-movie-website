import { GET_ALL_MOVIE } from '../api/service/movieService';
import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        status: '',
        movies: [],
        totalPages: 1,
        size: 1,
        current: 1,
    },
    reducers: {
        updateMovie: (state, action) => {
            state.movies = state.movies.map((item) => {
                if (item.id === action.payload.id) {
                    return (item = action.payload);
                } else {
                    return item;
                }
            });
        },
        changeCurrentPage: (state, action) => {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GET_ALL_MOVIE.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(GET_ALL_MOVIE.fulfilled, (state, action) => {
                state.status = '';
                state.movies = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.size = action.payload.size;
                state.current = action.payload.number + 1;
            });
    },
});

export const { changeCurrentPage, updateMovie } = movieSlice.actions;
export default movieSlice.reducer;
