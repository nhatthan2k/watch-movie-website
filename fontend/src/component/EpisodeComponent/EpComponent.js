import loadingEp from '../../asset/Image/ajax-loader.gif';
import Styles from './EpComponent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function EpComponent() {
    return (
        <>
            <div className={cx('filterEpisode')}>
                <span>
                    <FontAwesomeIcon icon={faSearch} />
                    Tìm tập nhanh
                    <FontAwesomeIcon icon={faAngleDown} />
                </span>
                <span>
                    <input type="text" placeholder="Nhập số tập" />
                </span>
                {/* <img id="loading-ep" src={loadingEp} /> */}
                {/* <div className={cx('suggestionsEp')}>
                            <a href="/">tập 15</a>
                        </div> */}
            </div>

            <div className={cx('Episodes')}>
                <ul className={cx('listEps')}>
                    <li>
                        <a>
                            <span className={cx('active')}>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>14</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default EpComponent;
