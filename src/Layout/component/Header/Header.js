import React from 'react';
import Styles from '../Header/Header.module.scss';
import classNames from 'classnames/bind';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import { publicRoute } from '../../../Route/Routes';

const cx = classNames.bind(Styles);

function Header() {
    const Pagelist = publicRoute.filter((publicRouteItem) => {
        return publicRouteItem.hasOwnProperty('Name');
    });

    Pagelist.shift();

    return (
        <div className={cx('Header')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Link to="/">MyWebsite.vn</Link>
                </div>

                <Search />

                <div className={cx('nav-items')}>
                    {Pagelist.map((PageItem, index) => {
                        return (
                            <Link to={PageItem.path} key={index}>
                                {PageItem.icon}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Header;
