import { Cookies } from 'react-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axios';

export const GET_ALL_SEASON = createAsyncThunk('season/GET_ALL_SEASON', async ({ search, movie, page }) => {
    let response = await instance.get(`/v1/admin/seasons?movie=${movie}&page=${page}&search=${search}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response.data.content;
});

export const POST_ADD_SEASON = async (formSeason) => {
    let resp = await instance.post(`/v1/admin/seasons`, formSeason, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_UPDATE_SEASON = async ({ formSeason, id }) => {
    let resp = await instance.put(`/v1/admin/seasons/${id}`, formSeason, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_STATUS_SEASON = async (id) => {
    let resp = await instance.put(
        `/v1/admin/seasons/${id}/status`,
        {},
        {
            headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
        },
    );
    return resp;
};

export const PUT_ADD_IMAGE_SEASON = async ({ formImageSeason, id }) => {
    let resp = await instance.put(`/v1/admin/seasons/${id}/image`, formImageSeason, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const DELETE_IMAGE_SEASON = async ({ idImage, idSeason }) => {
    let resp = await instance.delete(`/v1/admin/seasons/${idImage}/in/${idSeason}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const ADD_DAY_TO_SEASON = async ({ formAddDayToSeason, seasonDetailId }) => {
    let response = await instance.post(`/v1/admin/seasons/${seasonDetailId}/day`, formAddDayToSeason, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response;
};

export const DELETE_DAY_TO_SEASON = async ({ seasonId, dayId }) => {
    let response = await instance.delete(`/v1/admin/seasons/${seasonId}/day/${dayId}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response;
};
