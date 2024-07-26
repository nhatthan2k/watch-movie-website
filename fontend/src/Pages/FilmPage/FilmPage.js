import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './FilmPage.module.scss';
import Content from '../../Layout/component/Content/Content';
import MovieItem from '../../component/MovieItem/MovieItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SectionBar from '../../component/SectionBar/SectionBar';
import { useParams } from 'react-router-dom';
import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';
import { GENRE, SEASON } from '../../redux/selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { GET_GENRE_USER } from '../../redux/api/service/genreService';
import { publicRoute } from '../../Route/Routes';
import { GET_SEASON_CUSTOM } from '../../redux/api/service/seasonService';
import { changeCurrentPage } from '../../redux/reducers/seasonSlice';

const cx = classNames.bind(Styles);

function FilmPage() {
    const dispatch = useDispatch();
    const genres = useSelector(GENRE);
    const seasons = useSelector(SEASON);
    const { FilmPage } = useParams();
    const { Genre } = useParams();

    const checkTypeAndPath = (type, path) => {
        return publicRoute.filter(item => item.type === type && item.path === path)
    }

    // handle change page
    const handleChangePage = (value) => {
        dispatch(changeCurrentPage(value));
    };

    useEffect(() => {
        dispatch(GET_GENRE_USER())
    },[])

    useEffect(() => {
        if(checkTypeAndPath('type', '/'+FilmPage).length !== 0) {
            dispatch(GET_SEASON_CUSTOM({type:'type', stringGet: checkTypeAndPath('type', '/'+FilmPage)[0].apiRequest, page: seasons.current - 1}))
        } else if(checkTypeAndPath('status', '/'+FilmPage).length !== 0) {
            dispatch(GET_SEASON_CUSTOM({type:'status', stringGet: checkTypeAndPath('status', '/'+FilmPage)[0].apiRequest, page: seasons.current - 1}))
        } else if(Genre) {
            dispatch(GET_SEASON_CUSTOM({type:'genre', stringGet: Genre, page: seasons.current - 1}))
        }
    },[seasons.current])

    return (
        <>
            <Header />
            <Navbar genres={genres} FilmPagePath={FilmPage} Genre={Genre}/>
            <Content>
                <SectionBar></SectionBar>

                <div className={cx('showMovie')}>
                    {seasons.seasons.map((FilmItem, index) => (
                        <MovieItem data={FilmItem} key={index} />
                    ))}
                </div>

                <div className={cx('numberPage')}>
                        <ul>
                            {seasons.current > 1 && (
                                <li>
                                    <span onClick={() => handleChangePage(seasons.current-1)}>
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                    </span>
                                </li>
                            )}
                            <li>
                                <span onClick={() => handleChangePage(1)} className={seasons.current === 1 ? cx('current') : cx('')}>1</span>
                            </li>
                            {seasons.current-3 > 1 && (
                                <li>
                                <span className={cx('dots')}>...</span>
                                </li>
                            )}
                            {seasons.current-2 > 1 &&(
                                <li>
                                    <span onClick={() => handleChangePage(seasons.current-2)}>{seasons.current-2}</span>
                                </li>
                            )}
                            {seasons.current-1 > 1 &&(
                                <li>
                                    <span onClick={() => handleChangePage(seasons.current-1)}>{seasons.current-1}</span>
                                </li>
                            )}
                            {seasons.current > 1 && seasons.current < seasons.totalPages &&(
                                <li>
                                    <span className={cx('current')}>{seasons.current}</span>
                                </li>
                            )}
                            {seasons.current+1 < seasons.totalPages &&(
                                <li>
                                    <span onClick={() => handleChangePage(seasons.current+1)}>{seasons.current+1}</span>
                                </li>
                            )}
                            {seasons.current+2 < seasons.totalPages &&(
                                <li>
                                    <span onClick={() => handleChangePage(seasons.current+2)}>{seasons.current+2}</span>
                                </li>
                            )}
                            {seasons.current+3 < seasons.totalPages && (
                                <li>
                                    <span className={cx('dots')}>...</span>
                                </li>
                            )}
                            {seasons.current <= seasons.totalPages && seasons.totalPages !== 1 && (
                                <li>
                                    <span onClick={() => handleChangePage(seasons.totalPages)} className={seasons.current === seasons.totalPages ? cx('current') : cx('')}>{seasons.totalPages}</span>
                                </li>
                            )}
                            {seasons.current < seasons.totalPages && (
                                <li>
                                    <span onClick={() => handleChangePage(seasons.current+1)}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
            </Content>
            <Footer />
        </>
    );
}

export default FilmPage;
