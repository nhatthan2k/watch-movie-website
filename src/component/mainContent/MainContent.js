import Styles from './MainContent.module.scss';
import classNames from 'classnames/bind';
import MovieItem from '../../component/MovieItem/MovieItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FilmList } from '../../filmlist/Filmlist';
import { useEffect, useState } from 'react';
import SectionBar from '../SectionBar/SectionBar';

const cx = classNames.bind(Styles);

function MainContent({ data }) {
    const [hiddenFilm, setHiddenFilm] = useState([]);
    const [hiddeSectionBar, setHiddensectionBar] = useState(false);

    useEffect(() => {
        if (data === '' || data === 'Mới') {
            setHiddensectionBar(true);
            setHiddenFilm(FilmList);
            return;
        } else {
            setHiddensectionBar(false);
        }

        const filterFilm = FilmList.filter((Film) => {
            return Film.Showdate && Film.Showdate.includes(data);
        });

        setHiddenFilm(filterFilm);
    }, [data]);

    return (
        <div className={cx('mainContent')}>
            {hiddeSectionBar && <SectionBar>Mới Cập Nhật</SectionBar>}

            <div className={cx('showMovie')}>
                {hiddenFilm.map((FilmItem, index) => (
                    <MovieItem data={FilmItem} key={index} />
                ))}
            </div>

            <div className={cx('numberPage')}>
                <ul>
                    <li>
                        <span className={cx('current')}>1</span>
                    </li>
                    <li>
                        <span>2</span>
                    </li>
                    <li>
                        <span>3</span>
                    </li>
                    <li>
                        <span className={cx('dots')}>...</span>
                    </li>
                    <li>
                        <span>10</span>
                    </li>
                    <li>
                        <span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MainContent;
