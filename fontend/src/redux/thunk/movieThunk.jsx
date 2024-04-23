import {
    DELETE_IMAGE_MOVIE,
    POST_ADD_MOVIE,
    PUT_ADD_IMAGE_MOVIE,
    PUT_STATUS_MOVIE,
    PUT_UPDATE_MOVIE,
} from '../api/service/movieService';
import { changeCurrentPage, updateMovie } from '../reducers/movieSlice';

export const post_add_movie = (formMovie) => {
    return async function post_add_movie_thunk(dispatch) {
        let resp = await POST_ADD_MOVIE(formMovie);
        if (resp.status === 201) {
            dispatch(changeCurrentPage(1));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_update_movie = ({ formMovie, id }) => {
    return async function put_update_movie_thunk(dispatch) {
        let resp = await PUT_UPDATE_MOVIE({ formMovie, id });
        if (resp.status === 200) {
            dispatch(updateMovie(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_status_movie = (id) => {
    return async function put_status_movie_thunk(dispatch) {
        let resp = await PUT_STATUS_MOVIE(id);
        if (resp.status === 200) {
            dispatch(updateMovie(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_add_image_movie = ({ formImageMovie, id }) => {
    return async function put_add_image_movie_thunk(dispatch) {
        let resp = await PUT_ADD_IMAGE_MOVIE({ formImageMovie, id });
        if (resp.status === 200) {
            dispatch(updateMovie(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const delete_image_movie = ({ idImage, idMovie }) => {
    return async function delete_image_movie_thunk(dispatch) {
        let resp = await DELETE_IMAGE_MOVIE({ idImage, idMovie });
        if (resp.status === 200) {
            dispatch(updateMovie(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};
