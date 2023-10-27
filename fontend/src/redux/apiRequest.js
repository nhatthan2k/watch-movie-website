import axios from "axios"
import { loginError, loginStart, loginSuccess, logoutError, logoutStart, logoutSuccess, registerError, registerStart, registerSuccess } from "./authSlice"
import { deleteUserError, deleteUserStart, deleteUserSuccess, getUserError, getUserStart, getUserSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data))
        navigate("/")
    }
    catch (err) {
        dispatch(loginError())
    }
}

export const RegisterUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess())
        navigate("/login")
    }
    catch (err) {
        dispatch(registerError())
    }
}

export const getAllUser = async (accessToken, dispatch, axiosJwt) => { 
    dispatch(getUserStart());
    try {
        const res = await axiosJwt.get("/v1/user", {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(getUserSuccess(res.data))
    }
    catch (err) {
        dispatch(getUserError())
    }
}

export const getAUser = async (accessToken, dispatch, id, axiosJwt) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJwt.get("/v1/user/" + id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(getUserSuccess(res.data))
    }
    catch (err) {
        dispatch(getUserError())
    }
}

export const deleteUser = async (accessToken, dispatch, id, axiosJwt) => {
    dispatch(deleteUserStart());
    try { 
        const res = await axiosJwt.delete("/v1/user/" + id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(deleteUserSuccess(res.data))
    }
    catch (err) {
        dispatch(deleteUserError(err.response.data))
    }
}

export const logoutUser = async (accessToken, dispatch, id, navigate, axiosJwt) => {
    dispatch(logoutStart());
    try {
        await axiosJwt.post("/v1/auth/logout",id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logoutSuccess())
        navigate("/login")
    }
    catch (err) {
        dispatch(logoutError());
    }
}