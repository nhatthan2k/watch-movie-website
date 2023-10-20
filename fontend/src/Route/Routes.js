import Home from '../Pages/Home/Home';
import Follow from '../Pages/Follow/Follow';
import History from '../Pages/History/History';
import Login from '../Pages/Login/Login';
import FilmPage from '../Pages/FilmPage/FilmPage';
import Movieschedule from '../Pages/Movieschedule/Movieschedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowsRotate,
    faCalendarXmark,
    faCircleCheck,
    faClock,
    faThumbsUp,
    faClockRotateLeft,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const publicRoute = [
    { Name: 'Home', path: '/', icon: null, component: Home },
    { Name: 'Follow', path: '/follow', icon: <FontAwesomeIcon icon={faBookmark} />, component: Follow },
    { Name: 'History', path: '/history', icon: <FontAwesomeIcon icon={faClockRotateLeft} />, component: History },
    { Name: 'Login', path: '/login', icon: <FontAwesomeIcon icon={faRightToBracket} />, component: Login },
    { Typefilm: 'huyền huyễn', path: '/huyen-huyen', component: FilmPage },
    { Typefilm: 'Xuyên Không', path: '/xuyen-khong', component: FilmPage },
    { Typefilm: 'Trùng Sinh', path: '/trung-sinh', component: FilmPage },
    { Typefilm: 'Tiên Hiệp', path: '/tien-hiep', component: FilmPage },
    { Typefilm: 'Cổ trang', path: '/co-trang', component: FilmPage },
    { Typefilm: 'Hài Hước', path: '/hai-huoc', component: FilmPage },
    { Typefilm: 'Kiếm Hiệp', path: '/kiem-hiep', component: FilmPage },
    { Typefilm: 'Hiện Đại', path: '/hien-dai', component: FilmPage },
    { Navname: 'Phim Lẻ', path: '/phim-hoat-hình-3d-le', icon: null, component: FilmPage },
    {
        Navname: 'Phim Đang chiếu',
        path: '/phim-dang-chieu',
        icon: <FontAwesomeIcon icon={faArrowsRotate} />,
        component: FilmPage,
    },
    {
        Navname: 'Lịnh Chiếu',
        path: '/linh-chieu',
        icon: <FontAwesomeIcon icon={faCalendarXmark} />,
        component: Movieschedule,
    },
    {
        Navname: 'Phim Hoàn Thành',
        path: '/phim-hoan-thanh',
        icon: <FontAwesomeIcon icon={faCircleCheck} />,
        component: FilmPage,
    },
    {
        Navname: 'Phim Sắp chiếu',
        path: '/phim-sap-chieu',
        icon: <FontAwesomeIcon icon={faClock} />,
        component: FilmPage,
    },
    { Navname: 'Đáng xem', path: '/dang-xem', icon: <FontAwesomeIcon icon={faThumbsUp} />, component: FilmPage },
];

const privateRoute = [];

export { publicRoute, privateRoute };
