import React, { useState } from 'react';
import Styles from './IntroMovie.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { FilmList } from '../../filmlist/Filmlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faCirclePlay, faClock } from '@fortawesome/free-solid-svg-icons';

import Translate from '../../hook/Translate';
import Content from '../../Layout/component/Content/Content';
import SectionBar from '../../component/SectionBar/SectionBar';
import EpComponent from '../../component/EpisodeComponent/EpComponent';
import Comment from '../../component/Comment/Comment';

const cx = classNames.bind(Styles);

function IntroMovie() {
    const { IntroMovie } = useParams();
    const [showMore, setShowMore] = useState(true);

    const Data = FilmList.filter((FilmItem) => {
        const linkString = Translate(FilmItem.Name);

        return linkString === IntroMovie;
    });

    const hiddenContent = () => {
        setShowMore(!showMore);
    };

    return (
        <Content>
            <div className={cx('infoMovie')}>
                <div className={cx('mainInfo')}>
                    <div className={cx('first')}>
                        <img src={Data[0].Image} alt={Data[0].Name} />
                    </div>

                    <div className={cx('last')}>
                        <div className={cx('name')}>
                            <div>Tên</div>
                            <div>
                                <h1>{Data[0].Name}</h1>
                            </div>
                        </div>

                        <div className={cx('name_other')}>
                            <div>Tên Khác</div>
                            <div>
                                <p>{Data[0].EnglishName}</p>
                            </div>
                        </div>

                        <div className={cx('list_cate')}>
                            <div>Thể Loại</div>
                            <div>
                                <a href="/">CN Animation</a>
                            </div>
                        </div>

                        <div className={cx('new-ep')}>
                            <div>Tập mới nhất</div>
                            <div>
                                <span>{Data[0].Episodes}</span>
                            </div>
                        </div>

                        <div className={cx('hh3d-info')}>
                            <div>Thông Tin Khác</div>
                            <div>
                                <span>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <a>2023</a>
                                </span>
                                <FontAwesomeIcon icon={faClock} />
                                40 Tập
                            </div>
                        </div>

                        <div className="hh3d-rate">
                            <div>Đánh Giá</div>
                            <div>
                                <div className="taq-score">
                                    <span className="score">3.67</span>/<span className="max-ratings">5</span>
                                    <span className="total_votes">44</span>
                                    <span className="vote-txt"> lượt</span>
                                </div>
                                <div className="rate-this">
                                    <div>
                                        <span>
                                            <span></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('navInfo')}>
                    <div className={cx('watchMovie')}>
                        <a>
                            <FontAwesomeIcon icon={faCirclePlay} />
                            Xem Phim
                        </a>
                    </div>
                    <div className={cx('followMovie')}>
                        <a>
                            <FontAwesomeIcon icon={faBookmark} />
                            Theo dõi
                        </a>
                    </div>
                </div>

                <EpComponent />

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

                <div className={cx('entryContent')}>
                    <SectionBar>Nội dung phim</SectionBar>
                    <div className={cx('videoItem')}>
                        <article style={showMore ? { maxHeight: 120 + 'px' } : {}} className={cx('itemContent')}>
                            <strong>Xem phim Bất Diệt Thần Vương Vietsub 2023</strong>:
                            <p>
                                Vương Khả, tài tử ngành tài chính vô tình bị kiếm thần tổ truyền đưa đến Thần Châu tinh,
                                dựa vào thần công Đại Nhật Bất Diệt gia truyền, mua thấp bán cao bái nhập tiên môn. Vốn
                                tưởng sắp giàu có, không ngờ lại bị cuốn vào con sóng ngầm trào dâng của chánh đạo và ma
                                đạo. Vương Khả dựa vào thiên phú cùng trí tuệ của bản thân, tính toán từng bước, suôn sẻ
                                mọi bề, thắng được trái tim mỹ nhân, xây dựng đế quốc thương mại. Từng bước đi lên con
                                đường trừ ma vệ đạo, sau cùng trở thành Bất Diệt Thần Vương. Vương Khả, tài tử ngành tài
                                chính vô tình bị kiếm thần tổ truyền đưa đến Thần Châu tinh, dựa vào thần công Đại Nhật
                                Bất Diệt gia truyền, mua thấp bán cao bái nhập tiên môn. Vốn tưởng sắp giàu có, không
                                ngờ lại bị cuốn vào con sóng ngầm trào dâng của chánh đạo và ma đạo. Vương Khả dựa vào
                                thiên phú cùng trí tuệ của bản thân, tính toán từng bước, suôn sẻ mọi bề, thắng được
                                trái tim mỹ nhân, xây dựng đế quốc thương mại. Từng bước đi lên con đường trừ ma vệ đạo,
                                sau cùng trở thành Bất Diệt Thần Vương.
                            </p>
                        </article>
                        <div className={cx('itemContentToggle')}>
                            <div style={showMore ? { display: 'block' } : { display: 'none' }}></div>
                            <span className={cx('showMore')} onClick={hiddenContent}>
                                {showMore ? 'Mở rộng...' : 'Thu gọn...'}
                            </span>
                        </div>
                    </div>
                </div>

                <Comment />
            </div>
        </Content>
    );
}

export default IntroMovie;
