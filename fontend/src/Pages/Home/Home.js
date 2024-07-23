import React, { useEffect, useRef, useState } from 'react';
import Styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FilmList } from '../../filmlist/Filmlist';
import SliderItem from '../../component/SliderItem/SliderItem';
import Content from '../../Layout/component/Content/Content';
import { useMediaQuery } from 'react-responsive';
import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { SEASON } from '../../redux/selectors/selectors';
import SectionBar from '../../component/SectionBar/SectionBar';
import MovieItem from '../../component/MovieItem/MovieItem';
import { GET_ALL_SEASON_HOME } from '../../redux/api/service/seasonService';
import { changeCurrentPage } from '../../redux/reducers/seasonSlice';

const cx = classNames.bind(Styles);

const daylist = [
    { engDay: 'Mới', VnDay: 'Cập Nhật' },
    { engDay: 'Mon', VnDay: 'Thứ Hai' },
    { engDay: 'Tue', VnDay: 'Thứ Ba' },
    { engDay: 'Wed', VnDay: 'Thứ Tư' },
    { engDay: 'Thu', VnDay: 'Thứ Năm' },
    { engDay: 'Fri', VnDay: 'Thứ Sau' },
    { engDay: 'Sat', VnDay: 'Thứ Bảy' },
    { engDay: 'Sun', VnDay: 'Chử Nhật' },
];

function Home() {
    const dispatch = useDispatch();
    const seasons = useSelector(SEASON);
    const btnRefs = useRef([]);
    const navRefs = useRef([]);
    const isPc = useMediaQuery({ maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 739 });

    const [toggleDay, setToggleDay] = useState(true);
    const [selecday, setSelecday] = useState('');
    const [active, setActive] = useState(0);
    const [hiddenFilm, setHiddenFilm] = useState([]);
    const [hiddeSectionBar, setHiddensectionBar] = useState(false);

    console.log(seasons);

    const handleClick = (index) => {
        setActive(index);

        const spanElement = navRefs.current[index].querySelector('span');
        setSelecday(spanElement.innerText);
    };

    useEffect(() => {
        if (isMobile) {
            setToggleDay(false);
        } else setToggleDay(true);
    }, [isMobile]);

    useEffect(() => {
        if (selecday === '' || selecday === 'Mới') {
            setHiddensectionBar(true);
            setHiddenFilm(FilmList);
            return;
        } else {
            setHiddensectionBar(false);
        }

        const filterFilm = FilmList.filter((Film) => {
            return Film.Showdate && Film.Showdate.includes(selecday);
        });

        setHiddenFilm(filterFilm);
    }, [selecday]);

    const favoriteFilm = seasons.seasons.filter(season => season.slider);

    const [currentIndex, setCurrentIndex] = useState(0);

    const gotoPrev = () => {
        const isfistslide = currentIndex === 0;
        const newIndex = isfistslide ? favoriteFilm.length - 2 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const gotoNext = () => {
        const islastslide = currentIndex === favoriteFilm.length - 2;
        const newIndex = islastslide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // setInterval(() => gotoNext(), 5000)

    const sliderFilm = isPc
        ? [favoriteFilm[currentIndex]]
        : [favoriteFilm[currentIndex], favoriteFilm[currentIndex + 1]];

    const gotoslides = (index) => {
        setCurrentIndex(index);

        const btnNames = cx({
            active: true,
        });

        btnRefs.current.forEach((button, i) => {
            // Nếu phần tử đang xét không phải là phần tử được click
            if (i !== index) {
                // Xóa lớp CSS "active" khỏi phần tử đó
                button.classList.remove(btnNames);
            }
        });

        btnRefs.current[index].classList.add(btnNames);
    };

    // handle change page
    const handleChangePage = (value) => {
        dispatch(changeCurrentPage(value));
    };

    useEffect(() => {
        dispatch(GET_ALL_SEASON_HOME(seasons.current - 1));
    },[seasons.current]);

    return (
        <>
            <Header />
            <Navbar />
            <Content>
                <div className={cx('slider')}>
                    <div className={cx('action')}>
                        {sliderFilm.map((sliderFilmItem, index) => (
                            <SliderItem data={sliderFilmItem} key={index} />
                        ))}
                    </div>

                    <div className={cx('navSlider')}>
                        <button className={cx('prev')} onClick={gotoPrev}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>

                        <button className={cx('next')} onClick={gotoNext}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>

                    <div className={cx('dotSlider')}>
                        <button>
                            <span
                                ref={(el) => (btnRefs.current[0] = el)}
                                onClick={() => gotoslides(0)}
                                className={cx('active')}
                            ></span>
                        </button>
                        <button>
                            <span ref={(el) => (btnRefs.current[2] = el)} onClick={() => gotoslides(2)}></span>
                        </button>
                        <button>
                            <span ref={(el) => (btnRefs.current[4] = el)} onClick={() => gotoslides(4)}></span>
                        </button>
                    </div>
                </div>

                <div className={cx('navContent')}>
                    <ul>
                        {isMobile && (
                            <li className={cx('toggleNav')}>
                                <button onClick={() => setToggleDay(!toggleDay)}>Lịch Chiếu</button>
                            </li>
                        )}
                        {toggleDay &&
                            daylist.map((dayItem, index) => (
                                <li key={index}>
                                    <button
                                        ref={(el) => (navRefs.current[index] = el)}
                                        onClick={() => handleClick(index)}
                                        className={active === index ? cx('active') : ''}
                                    >
                                        <span>{dayItem.engDay}</span>
                                        <br />
                                        {dayItem.VnDay}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className={cx('mainContent')}>
                    {hiddeSectionBar && <SectionBar>Mới Cập Nhật</SectionBar>}

                    <div className={cx('showMovie')}>
                        {hiddenFilm.map((FilmItem, index) => (
                            <MovieItem data={FilmItem} key={index} />
                        ))}
                    </div>

                    <div className={cx('numberPage')}>
                        <ul>
                            {seasons.current > 1 && (
                                <li>
                                    <span>
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
                                    <span>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </Content>
            <Footer />
        </>
    );
}

export default Home;
