import { Cookies } from 'react-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axios';

export const GET_ALL_EPISODE = createAsyncThunk('episode/GET_ALL_EPISODE', async (seasonId) => {
    let response = await instance.get(`/v1/admin/episode/season/${seasonId}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    console.log(response);
    return response.data.content;
});

export const POST_ADD_EPISODE = async (formEpisode) => {
    let response = await instance.post(`/v1/admin/episode`, formEpisode, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response;
};

export const PUT_UPDATE_EPISODE = async ({ formEpisode, id }) => {
    let response = await instance.put(`/v1/admin/episode/${id}`, formEpisode, {
        headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
        },
    });
    return response;
};

export const PUT_STATUS_EPISODE = async (id) => {
    let response = await instance.put(
        `/v1/admin/episode/${id}/status`,
        {},
        {
            headers: {
                Authorization: `Bearer ${new Cookies().get('token')}`,
            },
        },
    );
    return response;
};
