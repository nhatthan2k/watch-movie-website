import React from 'react';
import Styles from '../SearchFilmItem/SearchFilmItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Translate from '../../hook/Translate';

const cx = classNames.bind(Styles);

function SearchFilmItem({ data }) {
    const moviePath = Translate(data.Name);

    return (
        <div className={cx('result-item')}>
            <Link to={`/phim/${moviePath}`}>
                <img className={cx('Avata')} src={data.Image} />
                <div className={cx('info')}>
                    <span>{data.Name}</span>
                    <p>{data.EnglishName}</p>
                </div>
            </Link>
        </div>
    );
}

export default SearchFilmItem;
