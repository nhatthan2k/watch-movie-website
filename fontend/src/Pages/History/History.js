import React from 'react';
import Styles from './History.module.scss';
import classNames from 'classnames/bind';
import { FilmList } from '../../filmlist/Filmlist';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import SmallMovieItem from '../../component/SmallMovieItem/SmallMovieItem';

const cx = classNames.bind(Styles);

function History() {
    return (
        <Content>
            <SectionBar>Lịch Sử Xem</SectionBar>
            <div className={cx('historyWatch')}>
                {FilmList.map((FilmItem, index) => (
                    <SmallMovieItem data={FilmItem} key={index} />
                ))}
            </div>
        </Content>
    );
}

export default History;
