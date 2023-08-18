import React from 'react';
import Styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(Styles);

function Footer() {
    return (
        <footer className={cx('Footer')}>
            <div className={cx('container')}>
                <div className={cx('Footerinfo')}>
                    <div className={cx('logo')}>MyWebsite.vn</div>
                    <a href="/https://www.facebook.com/">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </div>
            </div>
            <div className={cx('halimthemes')}> © Copyright ® 2023 MyWebsite</div>
        </footer>
    );
}

export default Footer;
