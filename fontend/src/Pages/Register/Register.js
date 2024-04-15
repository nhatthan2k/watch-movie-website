import React, { useState } from 'react';
import Styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { post_register } from '../../redux/thunk/authThunk';
import { validateBlank, validateUserName, validateEmail } from '../../utils/validate';
import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';

const cx = classNames.bind(Styles);

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // login form
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // validate
    const [error, setError] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [errFullName, setErrFullName] = useState('');
    const [errEmail, setErrEmail] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        setError('');
        setErrUsername('');
        setErrPassword('');
        setEmail('');
        setErrFullName('');

        const newUser = {
            username,
            password,
            email,
            fullName,
        };

        // validate
        if (!validateUserName(newUser.username)) {
            setErrUsername('UserName has 6 to 100 character and no special characters');
            return;
        }
        if (validateBlank(newUser.password)) {
            setErrPassword("You can't blank password");
            return;
        }
        if (validateBlank(newUser.fullName)) {
            setErrFullName("You can't blank fullname");
            return;
        }
        if (!validateEmail(newUser.email)) {
            setErrEmail("Email can't blank and must be in the correct email format");
            return;
        }

        dispatch(post_register(newUser)).then((resp) => {
            console.log(resp);
            if (resp === true) {
                navigate('/');
            } else {
                setError(resp);
            }
        });
    };

    return (
        <>
            <Header />
            <Navbar />
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
                                <small className={cx('validate')}>{errUsername}</small>
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
                                <small className={cx('validate')}>{errFullName}</small>
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
                                <small className={cx('validate')}>{errEmail}</small>
                            </div>

                            {error && <span className={cx('error')}>{error}</span>}

                            <button className={cx('button')}>Đăng Kí</button>
                        </form>
                    </div>
                </div>
            </Content>
            <Footer />
        </>
    );
}

export default Register;
