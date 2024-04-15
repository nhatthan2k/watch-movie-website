import React from 'react';
import classNames from 'classnames/bind';
import Styles from './FilmPage.module.scss';
import Content from '../../Layout/component/Content/Content';
import MovieItem from '../../component/MovieItem/MovieItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SectionBar from '../../component/SectionBar/SectionBar';

import { FilmList } from '../../filmlist/Filmlist';
import { useParams } from 'react-router-dom';
import Translate from '../../hook/Translate';

import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';

const cx = classNames.bind(Styles);

function FilmPage() {
    const { FilmPage } = useParams();

    const movieData = FilmList.filter((FilmItem) => {
        const replacedString = Translate(FilmItem.UpdateStatus);

        return replacedString === FilmPage;
    });

    return (
        <>
            <Header />
            <Navbar />
            <Content>
                <SectionBar>{movieData.length > 0 && movieData[0].UpdateStatus}</SectionBar>

                <div className={cx('showMovie')}>
                    {movieData.map((FilmItem, index) => (
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
            </Content>
            <Footer />
        </>
    );
}

export default FilmPage;
