import { GET_ALL_GENRE } from '../api/service/genreService';
import { createSlice } from '@reduxjs/toolkit';

const GenreSlice = createSlice({
    name: 'genre',
    initialState: { status: '', genre: [], totalPages: 1, size: 1, current: 1 },
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
        changeCurrentPage: (state, action) => {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GET_ALL_GENRE.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(GET_ALL_GENRE.fulfilled, (state, action) => {
            state.status = '';
            state.genre = action.payload.content.map((item) => ({
                ...item,
                isEdit: false,
            }));
            state.totalPages = action.payload.totalPages;
            state.size = action.payload.size;
            state.current = action.payload.number + 1;
        });
    },
});

export const { addNewGenre, updateGenre, enableEditItem, disabledEditItem, changeCurrentPage } = GenreSlice.actions;
export default GenreSlice.reducer;
