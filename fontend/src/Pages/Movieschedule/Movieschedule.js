import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Movieschedule.module.scss';
import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import { FilmList } from '../../filmlist/Filmlist';
import SmallMovieItem from '../../component/SmallMovieItem/SmallMovieItem';

const cx = classNames.bind(Styles);

function Movieschedule() {
    return (
        <>
            <Header />
            <Navbar />
            <Content>
                <SectionBar>Lịch Sử Xem</SectionBar>
                <div className={cx('historyWatch')}>
                    {FilmList.map((FilmItem, index) => (
                        <SmallMovieItem data={FilmItem} key={index} />
                    ))}
                </div>
            </Content>
            <Footer />
        </>
    );
}

export default Movieschedule;
