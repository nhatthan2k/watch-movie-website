import classNames from "classnames/bind";
import Styles from "./editMovie.module.scss"
import Content from "../../../Layout/component/Content/Content"
import SectionBar from "../../../component/SectionBar/SectionBar"

const cx = classNames.bind(Styles)

function movieControl() {
    return ( 
        <Content>
            <SectionBar>Đăng phim</SectionBar>
            
            <div className={cx('register')}>
                <div className={cx('Container')}>
                    <form className={cx('registerForm')}>
                        <div className={cx('formGroup')}>
                            <label htmlFor="user-register">Tên phim</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập tên tài khoản của bạn"
                                // onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-pass">Tên Tiếng anh</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập mật khẩu của bạn"
                                // onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">thể loại</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập Email của bạn"
                                // onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">ảnh</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập Email của bạn"
                                // onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">poster</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập Email của bạn"
                                // onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">lịch phát sóng</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập Email của bạn"
                                // onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">trạng thái</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập Email của bạn"
                                // onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <button className={cx('button')}>Update movie</button>
                    </form>
                </div>
            </div>
        </Content>
    );
}

export default movieControl;