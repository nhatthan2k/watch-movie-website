import React from 'react';
import Styles from './MovieItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(Styles);

function MovieItem({ data }) {
    return (
        <div className={cx('movieItem')}>
            <Link to={`/phim/${data.pathSeason}`}>
                <img src={data.avatar} />
                <span>Tập {data.Episodes}</span>
                <div className={cx('tiltleBox')}>
                    <div className={cx('movieTiltle')}>
                        <h1>{data.seasonName}</h1>
                        <p>{data.nickName}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MovieItem;
