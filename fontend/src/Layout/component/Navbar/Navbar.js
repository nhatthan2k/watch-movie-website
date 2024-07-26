import React, { useRef, useState, useEffect } from 'react';
import Styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { publicRoute } from '../../../Route/Routes';
import { useMediaQuery } from 'react-responsive';
import Search from '../Search/Search';

const cx = classNames.bind(Styles);

function Navbar({ genres, FilmPagePath, Genre}) {
    const [toggleMenu, setToggleMenu] = useState(true);
    const [toggleSeach, setToggleSeach] = useState(false);
    const isTabletMobile = useMediaQuery({ maxWidth: 1024 });

    const Navnamelist = publicRoute.filter((publicRouteItem) => {
        return publicRouteItem.hasOwnProperty('Navname');
    });

    useEffect(() => {
        if (isTabletMobile) {
            setToggleMenu(false);
        } else {
            setToggleMenu(true);
        }
    }, [isTabletMobile]);

    return (
        <div className={cx('navbar')}>
            <div className={cx('container')}>
                <div className={cx('wapperTogger')}>
                    <button className={cx('navbarToggle')} onClick={() => setToggleMenu(!toggleMenu)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <button className={cx('navbarToggle')} onClick={() => setToggleSeach(!toggleSeach)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <ul className={cx('menu')} style={toggleMenu ? { display: 'flex' } : { display: 'none' }}>
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li className={cx('dropdown')}>
                        <a href="#">
                            Thể loại <FontAwesomeIcon icon={faCaretDown} />
                        </a>
                        <ul className={cx('dropdownMenu')}>
                            {genres?.genre.map((MovieGenderItem, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={Genre === MovieGenderItem.pathGenre ? cx('activeMenu') : ''}
                                    >
                                        <a href={'/the-loai/'+MovieGenderItem.pathGenre}>{MovieGenderItem.genreName}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>

                    {Navnamelist.map((NavnameItem, index) => {
                        return (
                            <li
                                key={index}
                                className={'/'+FilmPagePath === NavnameItem.path ? cx('active') : ''}
                            >
                                <a href={NavnameItem.path}>
                                    {NavnameItem.icon} {NavnameItem.Navname}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {isTabletMobile && toggleSeach && (
                    <div className={cx('seachWrapper')}>
                        <Search />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
