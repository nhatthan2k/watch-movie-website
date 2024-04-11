import React, { useState } from 'react';
import Styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { post_login } from '../../redux/thunk/authThunk';

const cx = classNames.bind(Styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();

        const formLogin = {
            username: username,
            password: password,
        };

        dispatch(post_login(formLogin)).then((resp) => {
            if (Array.isArray(resp)) {
                if (resp.includes('ROLE_ADMIN')) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                // setError(resp);
            }
        });
    };

    return (
        <Content>
            <SectionBar>Đăng nhập tài khoản</SectionBar>

            <div className={cx('Login')}>
                <div className={cx('Container')}>
                    <div className={cx('info')}>
                        <div className={cx('GoogleLink')}>
                            <a>
                                <div className={cx('logo')}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </div>
                                <div className={cx('tiltle')}>
                                    Continue with <b>Google</b>
                                </div>
                            </a>
                        </div>
                        <div className={cx('FacebookLink')}>
                            <a>
                                <div className={cx('logo')}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </div>
                                <div className={cx('tiltle')}>
                                    Continue with <b>Facebook</b>
                                </div>
                            </a>
                        </div>
                    </div>

                    <form className={cx('loginForm')} onSubmit={handleLogin}>
                        <div className={cx('formGroup')}>
                            <label htmlFor="user-login">Tên tài khoản</label>
                            <input
                                type="text"
                                name="log"
                                id="user-login"
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

                        <div className={cx('formGroup', 'flex')}>
                            <input type="checkbox" name="rememberme" style={{ marginRight: '4px' }} />{' '}
                            <p>Ghi nhớ đăng nhập</p>
                        </div>

                        <button className={cx('button')}>Đăng Nhập</button>
                        <p>
                            Chưa có tài khoản?
                            <a href="/register">Đăng kí ngay</a>
                        </p>
                    </form>
                </div>
            </div>
        </Content>
    );
}

export default Login;
