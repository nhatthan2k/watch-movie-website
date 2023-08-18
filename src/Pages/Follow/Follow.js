import React from 'react';
import Styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';

const cx = classNames.bind(Styles);

function Follow() {
    return (
        <Content>
            <SectionBar>Tủ theo dõi phim</SectionBar>
        </Content>
    );
}

export default Follow;
