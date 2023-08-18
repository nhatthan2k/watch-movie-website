import React, { useRef, useState } from 'react';
import Styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FilmList } from '../../filmlist/Filmlist';
import SliderItem from '../../component/SliderItem/SliderItem';
import NavContent from '../../component/NavContent/NavContent';
import Content from '../../Layout/component/Content/Content';

const cx = classNames.bind(Styles);

function Home() {
    const btnRefs = useRef([]);

    const favorieFilm = FilmList.filter((FilmItem) => {
        return FilmItem.hasOwnProperty('Poster');
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const gotoPrev = () => {
        const isfistslide = currentIndex === 0;
        const newIndex = isfistslide ? favorieFilm.length - 2 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const gotoNext = () => {
        const islastslide = currentIndex === favorieFilm.length - 2;
        const newIndex = islastslide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const sliderFilm = [favorieFilm[currentIndex], favorieFilm[currentIndex + 1]];

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

    return (
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

            <NavContent />
        </Content>
    );
}

export default Home;
