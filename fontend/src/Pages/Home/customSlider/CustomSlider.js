import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Styles from './CustomSlider.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

export function NextArrow(props) {
    const { onClick } = props;
    return (
        <button className={cx('next')} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
    );
}
  
export function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button className={cx('prev')} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    );
}