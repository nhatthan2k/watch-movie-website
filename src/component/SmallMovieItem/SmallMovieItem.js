import Styles from './SmallMovieItem.module.scss';
import classNames from 'classnames/bind';
import Translate from '../../hook/Translate';
import { Link } from 'react-router-dom';

const cx = classNames.bind(Styles);

function SmallMovieItem({ data }) {
    const moviePath = Translate(data.Name);

    return (
        <div className={cx('item')}>
            <Link to={`/phim/${moviePath}`}>
                <div className={cx('imgWrapper')}>
                    <img src={data.Image} />
                </div>

                <div className={cx('tiltleWrapper')}>
                    <h1>{data.Name}</h1>
                    <div>
                        bạn đã xem Tập 19 -<span> 4 giờ trước </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SmallMovieItem;
