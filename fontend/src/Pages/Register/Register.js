import React, { useState } from 'react';
import Styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { post_register } from '../../redux/thunk/authThunk';

const cx = classNames.bind(Styles);

function Register() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
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
            fullName
        };

        dispatch(post_register(newUser)).then((resp) => {
            if(resp === true) {
                navigate('/')
            }
            // else {
                
            // }
        });
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
                            <label htmlFor="user-register">fullName</label>
                            <input
                                type="text"
                                name="log"
                                id="fullName-register"
                                className={cx('form-control')}
                                size="20"
                                placeholder="Nhập fullName của bạn"
                                required=""
                                onChange={(e) => setFullName(e.target.value)}
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
