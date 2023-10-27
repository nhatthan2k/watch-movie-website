import classNames from "classnames/bind";
import Styles from "./editUser.module.scss";
import Context from "../../../Layout/component/Content/Content"
import SectionBar from "../../../component/SectionBar/SectionBar";
import { useSelector } from "react-redux";

const cx = classNames.bind(Styles)

function UserPage() {
    const user = useSelector(state => state.auth.login?.currentUser)

    return ( 
        <Context>
            <SectionBar>thay đổi thông tin</SectionBar>
             
            <div className={cx('register')}>
                <div className={cx('Container')}>
                    <form className={cx('registerForm')}>
                        <div className={cx('formGroup')}>
                            <label htmlFor="user-register">user name</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập tên tài khoản của bạn"
                                // onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-pass">password</label>
                            <input
                                type="password"
                                className={cx('form-control')}
                                placeholder="Nhập mật khẩu của bạn"
                                // onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="user-email">email</label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Nhập Email của bạn"
                                // onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>

                        <button className={cx('button')}>Cập nhật</button>
                    </form>
                </div>
            </div>
        </Context>  
    );
}

export default UserPage;