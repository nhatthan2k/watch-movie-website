import { POST_ADD_EPISODE, PUT_STATUS_EPISODE, PUT_UPDATE_EPISODE } from '../api/service/episodeService';
import { addNewEpisode, updateEpisode } from '../reducers/episodeSlice';

export const post_add_episode = (formEpisode) => {
    return async function post_add_episode_thunk(dispatch) {
        let resp = await POST_ADD_EPISODE(formEpisode);
        if (resp.status === 201) {
            dispatch(addNewEpisode(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_update_episode = ({ formEpisode, id }) => {
    return async function put_update_episode_thunk(dispatch) {
        let resp = await PUT_UPDATE_EPISODE({ formEpisode, id });
        if (resp.status === 200) {
            dispatch(updateEpisode(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};

export const put_status_episode = (id) => {
    return async function put_status_episode_thunk(dispatch) {
        let resp = await PUT_STATUS_EPISODE(id);
        if (resp.status === 200) {
            dispatch(updateEpisode(resp.data));
            return true;
        } else {
            return resp.data;
        }
    };
};
