import React from 'react';
import Styles from './SliderItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Translate from '../../hook/Translate';

const cx = classNames.bind(Styles);

function SliderItem({ data, className }) {

    const classes = cx('sliderItem', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <Link to={`/phim/${data?.pathSeason}`}>
                <img src={data?.movie.poster} />
                <div className={cx('sliderText')}>
                    <h1>{data?.seasonName}</h1>
                    <p>{data?.nickName}</p>
                </div>
            </Link>
        </div>
    );
}

export default SliderItem;
