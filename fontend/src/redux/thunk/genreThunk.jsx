import { POST_ADD_GENRE, PUT_STATUS_GENRE, PUT_UPDATE_GENRE } from '../api/service/genreService';
import { addNewGenre, updateGenre } from '../reducers/genreSlice';

export const post_add_genre = (formGenre) => {
    return async function post_add_genre_thunk(dispatch) {
        let response = await POST_ADD_GENRE(formGenre);
        if (response.status === 201) {
            dispatch(addNewGenre(response.data));
            return true;
        } else {
            return response.data;
        }
    };
};

export const put_update_genre = ({ formGenre, id }) => {
    return async function put_update_genre_thunk(dispatch) {
        let response = await PUT_UPDATE_GENRE({ formGenre, id });
        if (response.status === 200) {
            dispatch(updateGenre(response.data));
            return true;
        } else {
            return response.data;
        }
    };
};

export const put_status_genre = (id) => {
    return async function put_status_genre_thunk(dispatch) {
        let response = await PUT_STATUS_GENRE(id);
        console.log(response);
        if (response.status === 200) {
            dispatch(updateGenre(response.data));
            return true;
        } else {
            return response.data;
        }
    };
};
