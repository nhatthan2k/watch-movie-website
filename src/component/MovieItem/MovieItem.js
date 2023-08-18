import React from 'react';
import Styles from './MovieItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Translate from '../../hook/Translate';

const cx = classNames.bind(Styles);

function MovieItem({ data }) {
    const moviePath = Translate(data.Name);

    return (
        <div className={cx('movieItem')}>
            <Link to={`/phim/${moviePath}`}>
                <img src={data.Image} />
                <span>Tập {data.Episodes}</span>
                <div className={cx('tiltleBox')}>
                    <div className={cx('movieTiltle')}>
                        <h1>{data.Name}</h1>
                        <p>{data.EnglishName}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MovieItem;
