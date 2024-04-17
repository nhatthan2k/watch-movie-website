import React from 'react';
import Styles from './page404.module.scss';
import classNames from 'classnames/bind';
import background404Page from '../../asset/Image/404Pages.png';

const cx = classNames.bind(Styles);

function Page404() {
    return (
        <div className={cx('container')}>
            <img src={background404Page}></img>
            <h1> Page is not found </h1>
        </div>
    );
}

export default Page404;
