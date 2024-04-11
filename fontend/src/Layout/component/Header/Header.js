import React from 'react';
import Styles from '../Header/Header.module.scss';
import classNames from 'classnames/bind';
import Search from '../Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import { publicRoute } from '../../../Route/Routes';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { handle_logout } from '../../../redux/thunk/authThunk';
import { createAxios } from '../../../createInstance';
import { resetUser } from '../../../redux/reducers/authSlice';

const cx = classNames.bind(Styles);

function Header() {
    const isPC = useMediaQuery({ minWidth: 1201 });
    const user =  useSelector(state => state.auth.login.currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJwt = createAxios(user, dispatch, resetUser)

    let Pagelist = publicRoute.filter((publicRouteItem) => {
        return publicRouteItem.hasOwnProperty('Name');
    });

    if (user) {
        Pagelist = Pagelist.filter(item => item.Name !== "Login")
    }

    Pagelist.shift();

    const handleLogout = () => {
        handle_logout(user?.accessToken, dispatch, user?._id, navigate, axiosJwt)
    }

    return (
        <div className={cx('Header')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Link to="/">MyWebsite.vn</Link>
                </div>

                {isPC && <Search />}

                <div className={cx('nav-items')}>
                    {Pagelist.map((PageItem, index) => {
                        return (
                            <Link to={PageItem.path} key={index}>
                                {PageItem.icon}
                            </Link>
                        );
                    })}

                    {user ? (
                    <>
                        <Link> 
                            <FontAwesomeIcon icon={faUser} />
                        </Link>

                        <Link>
                            <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
                        </Link>
                    </>
                    ) : null}
                    
                </div>
            </div>
        </div>
    );
}

export default Header;
