import {createSlice} from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        getMovie: {
            currentMovie: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getMovieStart: (state) => {
            state.getMovie.isFetching = true;
        },
        getMovieSuccess: (state, action) => {
            state.getMovie.isFetching = false;
            state.getMovie.currentMovie = action.payload;
            state.getMovie.error = false;
        },
        getMovieError: (state) => {
            state.getMovie.isFetching = false;
            state.getMovie.error = false;
        }
    }
})

export const {
    getMovieStart,
    getMovieSuccess,
    getMovieError
} = movieSlice.actions

export default movieSlice.reducer;