import { Cookies } from 'react-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axios';

export const GET_ALL_GENRE = createAsyncThunk('genre/GET_ALL_GENRE', async (search) => {
    let response = await instance.get(`/v1/admin/genres?search=${search}`);
    return response.data;
});

export const POST_ADD_GENRE = async (formGenre) => {
    let response = await instance.post('/v1/admin/genres', formGenre, {
        headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
        },
    });
    return response;
};

export const PUT_UPDATE_GENRE = async ({ formGenre, id }) => {
    let response = await instance.put(`/v1/admin/genres/${id}`, formGenre, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response;
};

export const PUT_STATUS_GENRE = async (id) => {
    let response = await instance.put(
        `/v1/admin/genres/${id}/status`,
        {},
        {
            headers: {
                Authorization: `Bearer ${new Cookies().get('token')}`,
            },
        },
    );
    return response;
};