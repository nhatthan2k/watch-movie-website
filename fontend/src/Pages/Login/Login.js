import React, { useState, useEffect } from 'react';
import Styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { post_login } from '../../redux/thunk/authThunk';
import { validateBlank } from '../../utills/validate';

const cx = classNames.bind(Styles);

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // login form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // validate
    const [error, setError] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [errPassword, setErrPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const formLogin = {
            username: username,
            password: password,
        };

        // validate
        if (validateBlank(formLogin.username)) {
            setErrUsername("You can't blank email");
            return;
        }
        if (validateBlank(formLogin.password)) {
            setErrPassword("You can't blank password");
            return;
        }

        dispatch(post_login(formLogin)).then((resp) => {
            if (Array.isArray(resp)) {
                if (resp.includes('ROLE_ADMIN')) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setError(resp);
            }
        });
    };

    useEffect(() => {
        setError('');
        setErrUsername('');
        setErrPassword('');
    }, []);

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
                        {error && <p className={cx('error')}>{error}</p>}
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
                            <small className={cx('validate')}>{errUsername}</small>
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
                            <small className={cx('validate')}>{errPassword}</small>
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
