import React, { useState } from 'react';
import Styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { RegisterUser } from '../../redux/apiRequest';

const cx = classNames.bind(Styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            email,
        };

        // RegisterUser(newUser, dispatch, navigate)
    };

    return (
        <Content>
            <SectionBar>Đăng ký tài khoản</SectionBar>

            <div className={cx('register')}>
                <div className={cx('Container')}>
                    <form className={cx('registerForm')} onSubmit={handleRegister}>
                        <div className={cx('formGroup')}>
                            <label htmlFor="user-register">Tên tài khoản</label>
                            <input
                                type="text"
                                name="log"
                                id="user-register"
                                className={cx('form-control')}
                                size="20"
                                placeholder="Nhập tên tài khoản của bạn"
                                required=""
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-pass">Password</label>
                            <input
                                type="password"
                                name="pwd"
                                id="user-pass"
                                className={cx('form-control')}
                                size="20"
                                placeholder="Nhập mật khẩu của bạn"
                                required=""
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">email</label>
                            <input
                                type="text"
                                name="eml"
                                id="user-email"
                                className={cx('form-control')}
                                size="20"
                                placeholder="Nhập Email của bạn"
                                required=""
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>

                        <button className={cx('button')}>Đăng Kí</button>
                    </form>
                </div>
            </div>
        </Content>
    );
}

export default Register;
