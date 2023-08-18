import dauphathuongkhung from '../asset/Image/dau-pha-thuong-khung.jpg';
import ore from '../asset/Image/O-Re.png';
import phannhantutien from '../asset/Image/phan-nhan-tu-tien.jpg';
import tienvodeton from '../asset/Image/tien-vo-de-ton.jpg';
import luyenkhimuoivannam from '../asset/Image/luyen-khi-muoi-van-nam.jpg';
import nhatniemvinhhang from '../asset/Image/nhat-niem-vinh-hang.jpg';
import hoagianghochibatluongnhan from '../asset/Image/hoa-giang-ho-chi-bat-luong-nhan.jpg';
import trutien from '../asset/Image/tru-tien.jpg';
import thananvuongtoa from '../asset/Image/than-an-vuong-toa.jpg';
import vothanchuate from '../asset/Image/vo-than-chua-te.jpg';
import thonphetinhkhong from '../asset/Image/thon-phe-tinh-khong.jpg';
import kiemcot from '../asset/Image/kiem-cot.jpg';

import dptkPoster from '../asset/Image/dau-pha-thuong-khung-phan-5-gia-nam-hoc-vien-poster.jpg';
import pnttPoster from '../asset/Image/pham-nhan-tu-tien-phan-2-poster.jpg';
import ttbPoster from '../asset/Image/tinh-than-bien-poster.png';
import hghblnPoster from '../asset/Image/hoa-giang-ho-chi-bat-luong-nhan-poster.jpg';
import tptkPoster from '../asset/Image/thon-phe-tinh-khong-poster.jpg';
import tavtPoster from '../asset/Image/than-an-vuong-toa-poster.jpg';

export const FilmList = [
    {
        Name: 'Đấu Phá Thương Khung',
        EnglishName: 'Fights Break Sphere',
        genre: ['Cổ Trang', 'huyền huyễn'],
        Episodes: '48',
        Image: dauphathuongkhung,
        Poster: dptkPoster,
        Showdate: ['Mon', 'Thu', 'Fri', 'Sun'],
        UpdateStatus: 'phim đang chiếu',
    },
    {
        Name: 'Phàm Nhân Tu Tiên',
        EnglishName: 'A Record of A Mortal Journey to Immortality',
        Genre: ['Huyền Huyễn', 'Kiếm Hiệp', 'Tiên Hiệp'],
        Episodes: '21',
        Image: phannhantutien,
        Poster: pnttPoster,
        Showdate: ['Tue', 'Thu', 'Sat', 'Sun'],
        UpdateStatus: 'phim hoàn thành',
    },
    {
        Name: 'Tiên Võ Đế Tôn',
        EnglishName: 'Xian Wu Di Zun',
        genre: ['Tiên Hiệp', 'huyền huyễn'],
        Episodes: '15',
        Image: tienvodeton,
        Poster: ttbPoster,
        Showdate: ['Mon', 'Thu', 'Fri', 'Sun'],
        UpdateStatus: 'phim sắp chiếu',
    },
    {
        Name: 'Ở Rể',
        EnglishName: 'My Heroic Husband',
        genre: ['Cổ Trang', 'Hài Hước', 'Xuyên Không'],
        Episodes: '10',
        Image: ore,
        Showdate: ['Tue', 'Thu', 'Sat', 'Sun'],
        UpdateStatus: 'phim hoàn thành',
    },
    {
        Name: 'Luyện Khí Mười Vạn Năm',
        EnglishName: 'Lian Qi Shi Wan Nian',
        genre: ['Cổ Trang', 'Tiên Hiệp'],
        Episodes: '39',
        Image: luyenkhimuoivannam,
        Showdate: ['Mon', 'Thu', 'Fri', 'Sun'],
        UpdateStatus: 'phim đang chiếu',
    },
    {
        Name: 'Nhất Niệm Vĩnh Hằng',
        EnglishName: 'A Will Eternal',
        genre: ['Hài Hước', 'huyền huyễn'],
        Episodes: '103',
        Image: nhatniemvinhhang,
        Showdate: ['Tue', 'Thu', 'Sat', 'Sun'],
        UpdateStatus: 'phim hoàn thành',
    },
    {
        Name: 'Hoạ Giang Hồ Chi Bất Lương Nhân',
        EnglishName: 'The Degenerate-Drawing Jianghu',
        genre: ['Cổ Trang', 'huyền huyễn', 'kiếm hiệp'],
        Episodes: '12',
        Image: hoagianghochibatluongnhan,
        Poster: hghblnPoster,
        Showdate: ['Mon', 'Wed', 'Fri'],
        UpdateStatus: 'phim hoàn thành',
    },
    {
        Name: 'Tru Tiên 2',
        EnglishName: 'Jade Dynasty 2',
        genre: ['Cổ Trang', 'huyền huyễn', 'Tiên Hiệp'],
        Episodes: '26',
        Image: trutien,
        Showdate: ['Tue', 'Wed', 'Sat'],
        UpdateStatus: 'phim sắp chiếu',
    },
    {
        Name: 'Thần Ấn Vương Tọa',
        EnglishName: 'Throne Of Seal',
        genre: ['Tiên Hiệp', 'huyền huyễn'],
        Episodes: '59',
        Image: thananvuongtoa,
        Poster: tavtPoster,
        Showdate: ['Mon', 'Wed', 'Fri'],
        UpdateStatus: 'phim đang chiếu',
    },
    {
        Name: 'Võ Thần Chúa Tể',
        EnglishName: 'Wu Shen Zhu Zai',
        genre: ['Cổ Trang', 'huyền huyễn', 'trùng sinh'],
        Episodes: '343',
        Image: vothanchuate,
        Showdate: ['Tue', 'Wed', 'Sat'],
        UpdateStatus: 'phim đang chiếu',
    },
    {
        Name: 'Thôn Phệ Tinh Không',
        EnglishName: 'Swallowed Star',
        genre: ['hiện đại', 'huyền huyễn'],
        Episodes: '85',
        Image: thonphetinhkhong,
        Poster: tptkPoster,
        Showdate: ['Mon', 'Wed', 'Fri'],
        UpdateStatus: 'phim sắp chiếu',
    },
    {
        Name: 'Kiếm Cốt',
        EnglishName: 'Jian Gu',
        genre: ['kiếm hiệp'],
        Episodes: '5',
        Image: kiemcot,
        Showdate: ['Tue', 'Wed', 'Sat'],
        UpdateStatus: 'phim sắp chiếu',
    },
];
