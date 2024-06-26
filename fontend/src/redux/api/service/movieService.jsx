import { Cookies } from 'react-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../axios';

export const GET_ALL_MOVIE = createAsyncThunk('movie/GET_ALL_MOVIE', async ({ search, genre, page }) => {
    let response = await instance.get(`/v1/admin/movies?genre=${genre}&page=${page}&search=${search}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    // console.log('getallpage --> ', response);
    return response.data.content;
});

export const GET_ALL_MOVIE_NO_PAGE = createAsyncThunk('movie/GET_ALL_MOVIE_NO_PAGE', async (search) => {
    let response = await instance.get(`/v1/admin/movies/no_page?search=${search}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    // console.log('getallNopage --> ', response);
    return response.data;
});

export const POST_ADD_MOVIE = async (formMovie) => {
    let resp = await instance.post(`/v1/admin/movies`, formMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_UPDATE_MOVIE = async ({ formMovie, id }) => {
    let resp = await instance.put(`/v1/admin/movies/${id}`, formMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const PUT_STATUS_MOVIE = async (id) => {
    let resp = await instance.put(
        `/v1/admin/movies/${id}/status`,
        {},
        {
            headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
        },
    );
    return resp;
};

export const PUT_ADD_IMAGE_MOVIE = async ({ formImageMovie, id }) => {
    let resp = await instance.put(`/v1/admin/movies/${id}/image`, formImageMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const DELETE_IMAGE_MOVIE = async ({ idImage, idMovie }) => {
    let resp = await instance.delete(`/v1/admin/movies/${idImage}/in/${idMovie}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return resp;
};

export const ADD_GENRE_TO_MOVIE = async ({ formAddGenreToMovie, movieDetailId }) => {
    let response = await instance.post(`/v1/admin/movie/${movieDetailId}/genre`, formAddGenreToMovie, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response;
};

export const DELETE_GENRE_TO_MOVIE = async ({ movieId, genreId }) => {
    let response = await instance.delete(`/v1/admin/movie/${movieId}/genre/${genreId}`, {
        headers: { Authorization: `Bearer ${new Cookies().get('token')}` },
    });
    return response;
};
