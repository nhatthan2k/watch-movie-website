import { GET_SLIDER_SEASON } from '../api/service/sliderService'
import { createSlice } from '@reduxjs/toolkit';

const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        status: '',
        sliders: [],
    },
    reducers: {
        updateSlider: (state, action) => {
            state.sliders = state.sliders.map((item) => {
                if (item.id === action.payload.id) {
                    return (item = action.payload);
                } else {
                    return item;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GET_SLIDER_SEASON.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(GET_SLIDER_SEASON.fulfilled, (state, action) => {
                state.status = '';
                state.sliders = action.payload.content;
            })
    },
});

export const { changeCurrentPage, updateSlider } = sliderSlice.actions;
export default sliderSlice.reducer;
