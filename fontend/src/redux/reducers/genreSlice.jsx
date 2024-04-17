import { GET_ALL_GENRE } from '../api/service/genreService';
import { createSlice } from '@reduxjs/toolkit';

const GenreSlice = createSlice({
    name: 'genre',
    initialState: { status: '', genre: [] },
    reducers: {
        addNewGenre: (state, action) => {
            state.genre.push(action.payload);
        },
        updateGenre: (state, action) => {
            state.genre = state.genre.map((item) => {
                if (item.id === action.payload.id) {
                    return (item = action.payload);
                } else {
                    return item;
                }
            });
        },
        enableEditItem: (state, action) => {
            state.genre = state.genre.map((item) => {
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
            state.genre = state.genre.map((item) => {
                item.isEdit = false;
                return item;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GET_ALL_GENRE.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(GET_ALL_GENRE.fulfilled, (state, action) => {
            state.status = '';
            state.genre = action.payload.map((item) => ({
                ...item,
                isEdit: false,
            }));
        });
    },
});

export const { addNewGenre, updateGenre, enableEditItem, disabledEditItem } = GenreSlice.actions;
export default GenreSlice.reducer;
