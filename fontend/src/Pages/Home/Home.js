import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Styles from './Home.module.scss';
import "./customSlider/custom.css"
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SliderItem from '../../component/SliderItem/SliderItem';
import Content from '../../Layout/component/Content/Content';
import { useMediaQuery } from 'react-responsive';
import Header from '../../Layout/component/Header/Header';
import Navbar from '../../Layout/component/Navbar/Navbar';
import Footer from '../../Layout/component/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GENRE, SEASON, SLIDER } from '../../redux/selectors/selectors';
import SectionBar from '../../component/SectionBar/SectionBar';
import MovieItem from '../../component/MovieItem/MovieItem';
import { GET_ALL_SEASON_HOME, GET_SEASON_BY_DAY } from '../../redux/api/service/seasonService';
import { changeCurrentPage } from '../../redux/reducers/seasonSlice';
import { GET_SLIDER_SEASON } from '../../redux/api/service/sliderService';
import { NextArrow, PrevArrow } from './customSlider/CustomSlider';
import { GET_GENRE_USER } from '../../redux/api/service/genreService';

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
    const sliders = useSelector(SLIDER);
    const genres = useSelector(GENRE);
    const sliderRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 739 });

    const [toggleDay, setToggleDay] = useState(true);
    const [hiddeSectionBar, setHiddensectionBar] = useState(true);
    const [currentDay, setCurrentDay] = useState('Mới');

    console.log(seasons);

    useEffect(() => {
        if (isMobile) {
            setToggleDay(false);
        } else setToggleDay(true);
    }, [isMobile]);

    // handle change page
    const handleChangePage = (value) => {
        dispatch(changeCurrentPage(value));
    };

    const handleDayClick = (day) => {
        if(day !== 'mới') {
            setHiddensectionBar(false)
        }
        dispatch(GET_SEASON_BY_DAY(day.toUpperCase()))
        setCurrentDay(day);
    }

    useEffect(() => {
        dispatch(GET_ALL_SEASON_HOME(seasons.current - 1));
    },[seasons.current]);
    
    useEffect(() => {
        dispatch(GET_SLIDER_SEASON())
        dispatch(GET_GENRE_USER())
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: dots => (
            <ul style={{ bottom: 0, width: 'auto', right: '15px' }}> {dots} </ul>
        ),
        customPaging: (i) => (
            <span className={cx('dot_span')}></span>
        ),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          }
        ]
    };

    return (
        <>
            <Header />
            <Navbar genres={genres} />
            <Content>
                <Slider ref={sliderRef} {...settings}>
                    {sliders.sliders.map((sliderFilmItem, index) => (
                        <SliderItem data={sliderFilmItem} key={index} />
                    ))}
                </Slider>

                <div className={cx('navContent')}>
                    <ul>
                        {isMobile && (
                            <li className={cx('toggleNav')}>
                                <button onClick={() => setToggleDay(!toggleDay)}>Lịch Chiếu</button>
                            </li>
                        )}
                        {toggleDay &&
                            daylist.map((dayItem, index) => (
                                dayItem.engDay === "Mới" ? 
                                <li key={index}>
                                    <a href='/'>
                                        <button
                                            className={dayItem.engDay === currentDay ? cx('active') : ''}
                                        >
                                            <span>{dayItem.engDay}</span>
                                            <br />
                                            {dayItem.VnDay}
                                        </button>
                                    </a>
                                </li>
                                : <li key={index}>
                                    <button
                                        onClick={() => handleDayClick(dayItem.engDay)}
                                        className={dayItem.engDay === currentDay ? cx('active') : ''}
                                    >
                                        <span>{dayItem.engDay}</span>
                                        <br />
                                        {dayItem.VnDay}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={cx('mainContent')}>
                    {hiddeSectionBar && <SectionBar>Mới Cập Nhật</SectionBar>}

                    <div className={cx('showMovie')}>
                        {seasons.seasons.map((FilmItem, index) => (
                            <MovieItem data={FilmItem} key={index} />
                        ))}
                    </div>

                    {currentDay === "Mới" && <div className={cx('numberPage')}>
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
                    </div>}
                </div>
            </Content>
            <Footer />
        </>
    );
}

export default Home;
