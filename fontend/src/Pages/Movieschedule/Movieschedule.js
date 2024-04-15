import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Movieschedule.module.scss';
import History from '../History/History';
import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';

const cx = classNames.bind(Styles);

function Movieschedule() {
    return (
        <>
            <Header />
            <Navbar />
            <History />
            <Footer />
        </>
    );
}

export default Movieschedule;
