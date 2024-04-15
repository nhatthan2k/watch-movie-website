import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './UserPage.module.scss';
import Context from '../../../Layout/component/Content/Content';
import SectionBar from '../../../component/SectionBar/SectionBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, getAllUser } from "../../../redux/apiRequest";
import { createAxios } from '../../../createInstance';
// import { loginSuccess } from "../../../redux/authSlice";
import Header from '../../../Layout/component/Header/Header';
import Navbar from '../../../Layout/component/Navbar/Navbar';
import Footer from '../../../Layout/component/Footer/Footer';

const cx = classNames.bind(Styles);

function UserPage() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listUser = useSelector((state) => state.users.users?.allusers);
    const msg = useSelector((state) => state.users?.msg);
    const dispatch = useDispatch();
    // const axiosJwt = createAxios(user, dispatch, loginSuccess)

    const handleDelete = (id) => {
        // deleteUser(user?.accessToken, dispatch, id, axiosJwt)
    };

    useEffect(() => {
        if (user?.accessToken) {
            // getAllUser(user?.accessToken, dispatch, axiosJwt)
        }
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            <Context>
                <SectionBar>Quản lý người dùng</SectionBar>

                <div className={cx('userContainer')}>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>thời gian tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser?.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.updatedAt}</td>
                                        <td>
                                            <Link to={`/user/edit/${user._id}`}>sửa</Link>{' '}
                                            <span onClick={() => handleDelete(user._id)}>xóa</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Context>
            <Footer />
        </>
    );
}

export default UserPage;
