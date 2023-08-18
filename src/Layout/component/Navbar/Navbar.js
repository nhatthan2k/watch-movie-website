import React, { useRef } from 'react';
import Styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { publicRoute } from '../../../Route/Routes';

const cx = classNames.bind(Styles);

function Navbar() {
    const itemRefs = useRef([]);
    const menuRefs = useRef([]);

    const MovieGenderList = publicRoute.filter((publicRouteItem) => {
        return publicRouteItem.hasOwnProperty('Typefilm');
    });

    const Navnamelist = publicRoute.filter((publicRouteItem) => {
        return publicRouteItem.hasOwnProperty('Navname');
    });

    const handleClick = (index) => {
        const itemNames = cx({
            active: true,
        });

        itemRefs.current.forEach((button, i) => {
            // Nếu phần tử đang xét không phải là phần tử được click
            if (i !== index) {
                // Xóa lớp CSS "active" khỏi phần tử đó
                button.classList.remove(itemNames);
            }
        });

        itemRefs.current[index].classList.add(itemNames);
    };

    const handleMenuClick = (index) => {
        const MenuName = cx({
            activeMenu: true,
        });

        menuRefs.current.forEach((button, i) => {
            // Nếu phần tử đang xét không phải là phần tử được click
            if (i !== index) {
                // Xóa lớp CSS "active" khỏi phần tử đó
                button.classList.remove(MenuName);
            }
        });

        menuRefs.current[index].classList.add(MenuName);
    };

    return (
        <div className={cx('navbar')}>
            <div className={cx('container')}>
                <ul className={cx('menu')}>
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li className={cx('dropdown')}>
                        <a href="#">
                            Thể loại <FontAwesomeIcon icon={faCaretDown} />
                        </a>
                        <ul className={cx('dropdownMenu')}>
                            {MovieGenderList.map((MovieGenderItem, index) => {
                                return (
                                    <li
                                        key={index}
                                        ref={(el) => (menuRefs.current[index] = el)}
                                        onClick={() => handleMenuClick(index)}
                                    >
                                        <Link to={MovieGenderItem.path}>{MovieGenderItem.Typefilm}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>

                    {Navnamelist.map((NavnameItem, index) => {
                        return (
                            <li
                                key={index}
                                ref={(el) => (itemRefs.current[index] = el)}
                                onClick={() => handleClick(index)}
                            >
                                <Link to={NavnameItem.path}>
                                    {NavnameItem.icon} {NavnameItem.Navname}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
