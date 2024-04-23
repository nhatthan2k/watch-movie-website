import { GET_ALL_SEASON } from '../api/service/seasonService';
import { createSlice } from '@reduxjs/toolkit';

const seasonSlice = createSlice({
    name: 'season',
    initialState: {
        status: '',
        seasons: [],
        totalPages: 1,
        size: 1,
        current: 1,
    },
    reducers: {
        updateSeason: (state, action) => {
            state.Seasons = state.Seasons.map((item) => {
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
            .addCase(GET_ALL_SEASON.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(GET_ALL_SEASON.fulfilled, (state, action) => {
                state.status = '';
                state.seasons = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.size = action.payload.size;
                state.current = action.payload.number + 1;
            });
    },
});

export const { changeCurrentPage, updateSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
