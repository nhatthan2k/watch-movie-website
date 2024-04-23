import { GET_ALL_EPISODE } from '../api/service/episodeService';
import { createSlice } from '@reduxjs/toolkit';

const episodeSlice = createSlice({
    name: 'episode',
    initialState: { status: '', episodes: [] },
    reducers: {
        addNewEpisode: (state, action) => {
            state.episodes.push(action.payload);
        },
        updateEpisode: (state, action) => {
            state.episodes = state.episodes.map((item) => {
                if (item.id === action.payload.id) {
                    return (item = action.payload);
                } else {
                    return item;
                }
            });
        },
        enableEditItem: (state, action) => {
            state.episodes = state.episodes.map((item) => {
                if (item.id === action.payload) {
                    item.isEdit = true;
                    return item;
                } else {
                    item.isEdit = false;
                    return item;
                }
            });
        },
        disabledEditItem: (state) => {
            state.episodes = state.episodes.map((item) => {
                item.isEdit = false;
                return item;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GET_ALL_EPISODE.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(GET_ALL_EPISODE.fulfilled, (state, action) => {
                state.status = '';
                state.episodes = action.payload.map((item) => ({
                    ...item,
                    isEdit: false,
                }));
            });
    },
});

export const { addNewEpisode, updateEpisode, enableEditItem, disabledEditItem } = episodeSlice.actions;
export default episodeSlice.reducer;
