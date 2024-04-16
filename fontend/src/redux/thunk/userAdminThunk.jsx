import { PUT_STATUS_USER } from '../api/service/userAdminService';
import { updateUser } from '../reducers/userAdminSlice';

export const put_status_user = (id) => {
    return async function put_status_user_thunk(dispatch) {
        let resp = await PUT_STATUS_USER(id);
        if (resp.status === 200) {
            dispatch(updateUser(resp.data.content));
            return true;
        } else {
            return resp.data.content;
        }
    };
};
