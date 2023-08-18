import Styles from './Sectionbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function SectionBar({ children }) {
    return (
        <div className={cx('sectionBar')}>
            <h1>
                <span>{children}</span>
            </h1>
        </div>
    );
}

export default SectionBar;
