import Styles from './CommentItem.module.scss';
import classNames from 'classnames/bind';
import avatar from '../../asset/Image/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faClock, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function CommentItem() {
    return (
        <div className={cx('commentItem')}>
            <div className={cx('commentLeft')}>
                <img src={avatar} />
                <span>nember</span>
            </div>
            <div className={cx('commentRight')}>
                <div className={cx('commentHeader')}>
                    <div>Nhật Thân 44</div>
                    {/* <img /> */}
                    <div className={cx('commentDate')}>
                        <FontAwesomeIcon icon={faClock} />
                        16 phút trước
                    </div>
                </div>
                <div className={cx('commentText')}>
                    <p>hihihihi</p>
                </div>
                <div className={cx('commentFooter')}>
                    <div className={cx('voteComment')}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <div>0</div>
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </div>

                    <div className={cx('replyButton')}>
                        <FontAwesomeIcon icon={faShare} />
                        <span>Phản hồi</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
