import instance from '../axios';

export const POST_LOGIN = async (formLogin) => {
    let response = await instance.post('/v1/auth/sign-in', formLogin);
    return response;
};

export const POST_REGISTER = async (formRegister) => {
    let response = await instance.post('/v1/auth/sign-up', formRegister);
    return response;
};
