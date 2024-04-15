import React from 'react';
import Styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';

import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';

const cx = classNames.bind(Styles);

function Follow() {
    return (
        <>
            <Header />
            <Navbar />
            <Content>
                <SectionBar>Tủ theo dõi phim</SectionBar>
            </Content>
            <Footer />
        </>
    );
}

export default Follow;
