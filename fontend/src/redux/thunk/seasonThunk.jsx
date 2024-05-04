import {
    DELETE_IMAGE_SEASON,
    POST_ADD_SEASON,
    PUT_ADD_IMAGE_SEASON,
    PUT_STATUS_SEASON,
    PUT_UPDATE_SEASON,
    ADD_DAY_TO_SEASON,
    DELETE_DAY_TO_SEASON,
} from '../api/service/seasonService';
import { changeCurrentPage, updateSeason } from '../reducers/seasonSlice';

export const post_add_season = (formSeason) => {
    return async function post_add_season_thunk(dispatch) {
        let resp = await POST_ADD_SEASON(formSeason);
        if (resp.status === 201) {
            dispatch(changeCurrentPage(1));
            return true;
        } else {
            return resp.data.content;
        }
    };
};

export const put_update_season = ({ formSeason, id }) => {
    return async function put_update_season_thunk(dispatch) {
        let resp = await PUT_UPDATE_SEASON({ formSeason, id });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};

export const put_status_season = (id) => {
    return async function put_status_season_thunk(dispatch) {
        let resp = await PUT_STATUS_SEASON(id);
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};

export const put_add_image_season = ({ formImageSeason, id }) => {
    return async function put_add_image_season_thunk(dispatch) {
        let resp = await PUT_ADD_IMAGE_SEASON({ formImageSeason, id });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};

export const delete_image_season = ({ idImage, idSeason }) => {
    return async function delete_image_season_thunk(dispatch) {
        let resp = await DELETE_IMAGE_SEASON({ idImage, idSeason });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};

export const post_add_day_to_season = ({ formAddDayToSeason, seasonDetailId }) => {
    return async function post_add_day_to_season_thunk(dispatch) {
        let resp = await ADD_DAY_TO_SEASON({ formAddDayToSeason, seasonDetailId });
        if (resp.status === 201) {
            dispatch(updateSeason(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};

export const delete_day_to_season = ({ seasonId, dayId }) => {
    return async function delete_day_to_season_thunk(dispatch) {
        let resp = await DELETE_DAY_TO_SEASON({ seasonId, dayId });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};
