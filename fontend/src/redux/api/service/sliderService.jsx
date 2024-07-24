import { Cookies } from 'react-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axios';

export const GET_SLIDER_SEASON = createAsyncThunk('slider/GET_SLIDER_SEASON', async () => {
    let response = await instance.get(`/v1/permit/seasons/slider`);
    return response.data;
});