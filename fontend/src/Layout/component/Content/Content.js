import React from 'react';
import Styles from './Content.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function Content({ children }) {
    return (
        <div className={cx('content')}>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default Content;
