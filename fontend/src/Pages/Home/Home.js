import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Styles from './Home.module.scss';
import "./customSlider/custom.css"
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
import { SEASON, SLIDER } from '../../redux/selectors/selectors';
import SectionBar from '../../component/SectionBar/SectionBar';
import MovieItem from '../../component/MovieItem/MovieItem';
import { GET_ALL_SEASON_HOME } from '../../redux/api/service/seasonService';
import { changeCurrentPage } from '../../redux/reducers/seasonSlice';
import { GET_SLIDER_SEASON } from '../../redux/api/service/sliderService';
import { NextArrow, PrevArrow } from './customSlider/CustomSlider';

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
    const navRefs = useRef([]);
    const sliderRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 739 });

    const [toggleDay, setToggleDay] = useState(true);
    const [selecday, setSelecday] = useState('');
    const [active, setActive] = useState(0);
    const [hiddenFilm, setHiddenFilm] = useState([]);
    const [hiddeSectionBar, setHiddensectionBar] = useState(false);

    console.log(sliders);

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

    // handle change page
    const handleChangePage = (value) => {
        dispatch(changeCurrentPage(value));
    };

    useEffect(() => {
        dispatch(GET_ALL_SEASON_HOME(seasons.current - 1));
    },[seasons.current]);
    
    useEffect(() => {
        dispatch(GET_SLIDER_SEASON())
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
            breakpoint: 600,
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
            <Navbar />
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
                            ))
                        }
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
