import React from 'react';
import Styles from './SliderItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Translate from '../../hook/Translate';

const cx = classNames.bind(Styles);

function SliderItem({ data, className }) {
    const moviePath = Translate(data.Name);

    const classes = cx('sliderItem', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <Link to={`/phim/${moviePath}`}>
                <img src={data.Poster} />
                <div className={cx('sliderText')}>
                    <h1>{data.Name}</h1>
                    <p>{data.EnglishName}</p>
                </div>
            </Link>
        </div>
    );
}

export default SliderItem;
