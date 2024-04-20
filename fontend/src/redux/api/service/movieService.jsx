import { Cookies } from 'react-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axios';

export const GET_ALL_MOVIE = createAsyncThunk('movie/GET_ALL_MOVIE', async ({ search, category, page }) => {
    let response = await instance.get(`/api/movies/?category=${category}&page=${page}&search=${search}`);
    return response.data;
});

export const POST_ADD_MOVIE = async (formMovie) => {
    let resp = await instance.post(`/api/movies`, formMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_UPDATE_MOVIE = async ({ formMovie, id }) => {
    let resp = await instance.put(`/api/movies/${id}`, formMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_STATUS_MOVIE = async (id) => {
    let resp = await instance.put(
        `/api/movies/${id}/status`,
        {},
        {
            headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
        },
    );
    return resp;
};

export const PUT_ADD_IMAGE_MOVIE = async ({ formImageMovie, id }) => {
    let resp = await instance.put(`/api/movies/${id}/image`, formImageMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const DELETE_IMAGE_MOVIE = async ({ idImage, idMovie }) => {
    let resp = await instance.delete(`/api/movies/${idImage}/in/${idMovie}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const POST_ADD_MOVIE_DETAIL = async ({ formMovieDetail, idMovie }) => {
    let resp = await instance.post(`/api/movies/${idMovie}`, formMovieDetail, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_UPDATE_MOVIE_DETAIL = async ({ formMovieDetail, idMovieDetail, idMovie }) => {
    let resp = await instance.put(`/api/movies/${idMovieDetail}/in/${idMovie}`, formMovieDetail, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_STATUS_MOVIE_DETAIL = async ({ idMovieDetail, idMovie }) => {
    let resp = await instance.put(
        `/api/movies/${idMovieDetail}/in/${idMovie}/status`,
        {},
        {
            headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
        },
    );
    return resp;
};
