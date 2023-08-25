import React, { useRef, useEffect, useState } from 'react';
import Styles from './NavContent.module.scss';
import classNames from 'classnames/bind';
import MainContent from '../../component/mainContent/MainContent';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(Styles);

function NavContent() {
    const btnrefs = useRef([]);
    const [toggleDay, setToggleDay] = useState(true);
    const [selecday, setSelecday] = useState('');
    const [active, setActive] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 739 });

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

    const handleClick = (index) => {
        setActive(index);

        const spanElement = btnrefs.current[index].querySelector('span');
        setSelecday(spanElement.innerText);
    };

    useEffect(() => {
        if (isMobile) {
            setToggleDay(false);
        } else setToggleDay(true);
    }, [isMobile]);

    return (
        <>
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
                                    ref={(el) => (btnrefs.current[index] = el)}
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

            <MainContent data={selecday} />
        </>
    );
}

export default NavContent;
