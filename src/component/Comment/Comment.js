import { useState } from 'react';
import Styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import avatar from '../../asset/Image/avatar.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faEnvelope, faFireFlameCurved, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import CommentItem from '../CommentItem/CommemtItem';

const cx = classNames.bind(Styles);

function Comment() {
    const [hiddeninfoComment, SetHiddeninfoComment] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const handleShowCom = () => {
        setShowComment(true);
    };

    return (
        <div className={cx('comments')}>
            <div className={cx('formWrapper')}>
                <div className={cx('formHead')}>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faRightToBracket} />
                        Đăng nhập để bình luận
                    </Link>
                </div>

                <form className={cx('commentsForm')}>
                    <div className={cx('commentsContent')}>
                        <div className={cx('avatar')}>
                            <img src={avatar} />
                        </div>
                        <div className={cx('inputComment')}>
                            <input onClick={() => SetHiddeninfoComment(true)} placeholder="Tham gia bình luận" />
                        </div>
                    </div>

                    <div
                        style={hiddeninfoComment ? { display: 'block' } : { display: 'none' }}
                        className={cx('infoComment')}
                    >
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <input type="text" placeholder="Tên" />
                        </div>

                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="email" placeholder="Email" />
                        </div>

                        <div className={cx('submitSend')}>
                            <button>Gửi</button>
                        </div>

                        <i>Đặt tên chứa từ ngữ thô tục sẽ không được duyệt bình luận</i>
                    </div>
                </form>
            </div>

            {/* thread */}
            <div className={cx('threadWrapper')}>
                <div className={cx('threadHead')}>
                    <div className={cx('threadInfo')}>
                        <span>104</span>
                        Bình luận
                    </div>
                    <div className={cx('threadFilter')}>
                        <FontAwesomeIcon icon={faFireFlameCurved} />
                        <div className={cx('filterSelect')}>
                            <span>Mới nhất</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                            <div className={cx('filterList')}>
                                <span>Cũ nhất</span>
                                <span>Được bỏ phiếu nhiều nhất</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('threadList')}>
                    <div className={cx('commentList')}>
                        <CommentItem />
                    </div>

                    <div className={cx('loadMoreSubmit')}>
                        <button onClick={handleShowCom}>{showComment ? 'Tải thêm bình luận' : 'Xem bình luận'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
