import React, { useRef, useEffect, useState } from 'react';
import Styles from './NavContent.module.scss';
import classNames from 'classnames/bind';
import MainContent from '../../component/mainContent/MainContent';

const cx = classNames.bind(Styles);

function NavContent() {
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

    const [selecday, setSelecday] = useState('');

    const btnrefs = useRef([]);

    useEffect(() => {
        const btnNames = cx({
            active: true,
        });

        btnrefs.current[0].classList.add(btnNames);
    }, []);

    const handleClick = (index) => {
        const btnNames = cx({
            active: true,
        });

        btnrefs.current.forEach((button, i) => {
            // Nếu phần tử đang xét không phải là phần tử được click
            if (i !== index) {
                // Xóa lớp CSS "active" khỏi phần tử đó
                button.classList.remove(btnNames);
            }
        });

        btnrefs.current[index].classList.add(btnNames);

        const spanElement = btnrefs.current[index].querySelector('span');
        setSelecday(spanElement.innerText);
    };

    return (
        <>
            <div className={cx('navContent')}>
                <ul>
                    {daylist.map((dayItem, index) => (
                        <li key={index}>
                            <button ref={(el) => (btnrefs.current[index] = el)} onClick={() => handleClick(index)}>
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
