import React from 'react';
import Styles from './WatchMoviePage.module.scss';
import classNames from 'classnames/bind';
import Comment from '../../component/Comment/Comment';
import Content from '../../Layout/component/Content/Content';
import EpComponent from '../../component/EpisodeComponent/EpComponent';
import VideoComponent from '../../component/VideoComponent/VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackward,
    faCircleHalfStroke,
    faEye,
    faForward,
    faInfoCircle,
    faShareNodes,
    faThumbsUp,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(Styles);

function WatchMoviePage() {
    const istabletPC = useMediaQuery({ minWidth: 740 });

    return (
        <Content>
            <VideoComponent />

            <div className={cx('NavWatch')}>
                {istabletPC && (
                    <div className={cx('leftside')}>
                        <div className={cx('like')}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            Thích
                        </div>

                        <div className={cx('share')}>
                            <FontAwesomeIcon icon={faShareNodes} />
                            chia sẻ
                        </div>
                    </div>
                )}

                <div className={cx('rightside')}>
                    <div className={cx('prevEpisode')}>
                        <FontAwesomeIcon icon={faBackward} />
                        Tập trước
                    </div>
                    <div className={cx('nextEpisode')}>
                        Tập tiếp theo
                        <FontAwesomeIcon icon={faForward} />
                    </div>
                    {istabletPC && (
                        <div className={cx('toggleLight')}>
                            <FontAwesomeIcon icon={faCircleHalfStroke} />
                            Tắt đèn
                        </div>
                    )}
                    <div className={cx('report')}>
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                        Báo lỗi
                    </div>
                    {istabletPC && (
                        <div className={cx('View')}>
                            <FontAwesomeIcon icon={faEye} />
                            Lượt xem
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('remind')}>
                Mẹo : Bấm vào sv{' '}
                <b>
                    <font>VIP</font>
                </b>{' '}
                hoặc{' '}
                <b>
                    {' '}
                    <font>FBO</font>
                </b>{' '}
                nếu không thấy trình phát video
            </div>

            <EpComponent />

            <div className={cx('infoBar')}>
                <a>
                    <FontAwesomeIcon icon={faInfoCircle} /> Đấu Phá Thương Khung Tập 57 Việt Sub | HH3D
                </a>
            </div>

            <div className={cx('showtimeMovies')}>
                <p>
                    <b>
                        Phim Chiếu 1 Tập Vào Trưa
                        <a>
                            <span> Thứ 5</span>
                        </a>
                    </b>
                </p>
            </div>

            <Comment />
        </Content>
    );
}

export default WatchMoviePage;
