import React, { useEffect, useRef, useState } from 'react';
import Styles from '../Search/Search.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SearchFilmItem from '../../../component/SearchFilmItem/SearchFilmItem';
import { FilmList } from '../../../filmlist/Filmlist';
import useDebounce from '../../../hook/useDebounce';

const cx = classNames.bind(Styles);

function Search() {
    const [searchvalue, setSearchvalue] = useState('');
    const [searchresult, setSearchresult] = useState([]);
    const [showresult, setShowresult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchvalue, 500);
    const inputref = useRef();

    useEffect(() => {
        if (!debounce.trim('')) {
            setSearchresult([]);
            return;
        }

        setLoading(true);

        const results = FilmList.filter((FilmItem) => {
            return FilmItem.Name.includes(debounce);
        });

        setSearchresult(results);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [debounce]);

    const handlechange = (e) => {
        setSearchvalue(e.target.value);
    };

    const HandleHidenResult = () => {
        setShowresult(false);
    };

    return (
        <HeadlessTippy
            interactive
            placement="bottom"
            visible={showresult && debounce.length > 0}
            offset={[0, 0]}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <div className={cx('Wapper')}>
                        <div className={cx('search-tiltle')}>
                            {debounce.trim('').length === 0 ? (
                                <h1>Vui lòng nhập một từ khóa</h1>
                            ) : (
                                <h1>
                                    Kết quả tìm kiếm: <span>{`${searchvalue}`}</span>
                                </h1>
                            )}
                        </div>

                        {searchresult.map((filteredFilm, index) => (
                            <SearchFilmItem data={filteredFilm} key={index} />
                        ))}
                    </div>
                </div>
            )}
            onClickOutside={HandleHidenResult}
        >
            <div className={cx('search')}>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={cx('search-icon')}
                    onClick={() => inputref.current.focus()}
                />
                <input
                    placeholder="Tìm kiếm"
                    onChange={handlechange}
                    value={searchvalue}
                    ref={inputref}
                    onFocus={() => setShowresult(true)}
                />
                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
