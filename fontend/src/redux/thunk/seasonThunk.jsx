import {
    DELETE_IMAGE_SEASON,
    POST_ADD_SEASON,
    POST_ADD_SEASON_DETAIL,
    PUT_ADD_IMAGE_SEASON,
    PUT_STATUS_SEASON,
    PUT_STATUS_SEASON_DETAIL,
    PUT_UPDATE_SEASON,
    PUT_UPDATE_SEASON_DETAIL,
} from '../api/service/seasonService';
import { changeCurrentPage, updateSeason } from '../reducers/seasonSlice';

export const post_add_season = (formSeason) => {
    return async function post_add_season_thunk(dispatch) {
        let resp = await POST_ADD_SEASON(formSeason);
        if (resp.status === 201) {
            dispatch(changeCurrentPage(1));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_update_season = ({ formSeason, id }) => {
    return async function put_update_season_thunk(dispatch) {
        let resp = await PUT_UPDATE_SEASON({ formSeason, id });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_status_season = (id) => {
    return async function put_status_season_thunk(dispatch) {
        let resp = await PUT_STATUS_SEASON(id);
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_add_image_season = ({ formImageSeason, id }) => {
    return async function put_add_image_season_thunk(dispatch) {
        let resp = await PUT_ADD_IMAGE_SEASON({ formImageSeason, id });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const delete_image_season = ({ idImage, idSeason }) => {
    return async function delete_image_season_thunk(dispatch) {
        let resp = await DELETE_IMAGE_SEASON({ idImage, idSeason });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const post_add_season_detail = ({ formSeasonDetail, idSeason }) => {
    return async function post_add_season_detail_thunk(dispatch) {
        let resp = await POST_ADD_SEASON_DETAIL({ formSeasonDetail, idSeason });
        if (resp.status === 201) {
            dispatch(updateSeason(resp.data));
            return resp.data;
        } else {
            return resp.data;
        }
    };
};

export const put_update_season_detail = ({ formSeasonDetail, idSeasonDetail, idSeason }) => {
    return async function put_update_season_detail_thunk(dispatch) {
        let resp = await PUT_UPDATE_SEASON_DETAIL({
            formSeasonDetail,
            idSeasonDetail,
            idSeason,
        });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data));
            return resp.data;
        } else {
            return resp.data;
        }
    };
};

export const put_status_season_detail = ({ idSeasonDetail, idSeason }) => {
    return async function put_status_season_detail_thunk(dispatch) {
        let resp = await PUT_STATUS_SEASON_DETAIL({ idSeasonDetail, idSeason });
        if (resp.status === 200) {
            dispatch(updateSeason(resp.data));
            return resp.data;
        } else {
            return resp.data;
        }
    };
};
