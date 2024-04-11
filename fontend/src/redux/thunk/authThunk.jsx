import { POST_LOGIN, POST_REGISTER } from "../api/service/authService";
import { resetData, setFavourite, setUserLogin } from "../reducers/userSlice";
import { resetUser, setUser } from "../reducers/authSlice";

import { Cookies } from "react-cookie";

export const post_login = (formLogin) => {
  return async function post_login_thunk(dispatch) {
    try {
      let response = await POST_LOGIN(formLogin);
      if (response && response.status === 200) {
        const data = response.data;
        const cookie = new Cookies();
        cookie.set("token", data.token, { path: "/" });
        // cookie.set("roles", data.roles, { path: "/" });
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setFavourite(data.favourite));
        dispatch(setUserLogin(data));
        dispatch(setUser(data));
        return data.roles;
      } else {
        return response && response.data;
      }
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error("Lỗi trong quá trình đăng nhập:", error);
    }
  };
};

export const post_register = (formRegister) => {
  return async function post_register_thunk() {
    let response = await POST_REGISTER(formRegister);
    if (response.status === 201) {
      return true;
    } else {
      return response.data;
    }
  };
};

export const handle_logout = () => {
  return async function handle_logout_thunk(dispatch) {
    const cookie = new Cookies();
    cookie.remove("token", { path: "/" });
    localStorage.removeItem("user");
    dispatch(resetUser());
    dispatch(resetData());
  };
};
