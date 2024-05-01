import { GENRE, MOVIE } from '../../../redux/selectors/selectors';
import { TIME_OUT, debouncing } from '../../../utils/deboucing';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import FilterIcon from '@mui/icons-material/Filter';
import FormAddMovie from '../../../component/form/movie/FormAddMovie';
import FormAddGenreToMovie from '../../../component/form/movie/FormAddGenreToMovie';
import FormControl from '@mui/material/FormControl';
import FormEditImageMovie from '../../../component/form/movie/FormEditImageMovie';
import FormEditMovieInfo from '../../../component/form/movie/FormEditMovieInfo';
import { GET_ALL_GENRE_NO_PAGE } from '../../../redux/api/service/genreService';
import { GET_ALL_MOVIE } from '../../../redux/api/service/movieService';
import InputLabel from '@mui/material/InputLabel';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { changeCurrentPage } from '../../../redux/reducers/movieSlice';
import { put_status_movie, delete_genre_to_movie } from '../../../redux/thunk/movieThunk';

function ManageMovie() {
    const dispatch = useDispatch();

    // State
    const genres = useSelector(GENRE);
    const movies = useSelector(MOVIE);

    // console.log('genre-->', genres);
    // console.log('movie-->', movies);

    // handle add new movie
    const [toggle, setToggle] = useState(false);
    const handleCreateForm = () => setToggle(true);
    const handleCloseForm = () => setToggle(false);

    // handle add genre to movie
    const [movieDetailId, setMovieDetailId] = useState(null);

    const [openAddGenre, setOpenAddGenre] = useState(false);
    const handleAddGenreForm = (id) => {
        setMovieDetailId(id);
        setOpenAddGenre(true);
    };
    const handleCloseAddGenre = () => setOpenAddGenre(false);

    // handle delete genre
    const handleDeleteGenre = (genreId, movieId) => {
        dispatch(delete_genre_to_movie({ movieId, genreId })).then((resp) => {
            if (resp === true) {
                handleLoadMovie(movies.current - 1);
            }
        });
    };

    // data edit
    const [edit, setEdit] = useState(null);

    // handle edit info movie
    const [openEditInfo, setOpenEditInfo] = useState(false);
    const handleOpenEditInfo = (item) => {
        setEdit(item);
        setOpenEditInfo(true);
    };
    const handleCloseEditInfo = () => setOpenEditInfo(false);

    // handle edit image movie
    const [openEditImage, setOpenEditImage] = useState(false);
    const handleOpenEditImage = (item) => {
        setEdit(item);
        setOpenEditImage(true);
    };
    const handleCloseEditImage = () => setOpenEditImage(false);

    // handle change status movie
    const handleChangeStatusMovie = (id) => {
        dispatch(put_status_movie(id)).then((resp) => {
            if (resp === true) {
                handleLoadMovie(movies.current - 1);
            }
        });
    };

    // handle filter by genre
    const [genre, setGenre] = useState('ALL');
    const handleChangeGenre = (event) => {
        setGenre(event.target.value);
    };

    // handle search
    const [search, setSearch] = useState('');
    const handleChangeSearch = (e) => setSearch(e.target.value);

    // handle change page
    const handleChangePage = (e, value) => {
        dispatch(changeCurrentPage(value));
    };

    // handle load movie
    const handleLoadMovie = (newPage) => {
        dispatch(GET_ALL_MOVIE({ search, genre, page: newPage }));
    };

    useEffect(() => {
        dispatch(GET_ALL_GENRE_NO_PAGE(''));
        handleLoadMovie(movies.current - 1);
    }, [search, genre, movies.current]);

    return (
        <div>
            <div className="flex justify-center text-3xl font-semibold uppercase">Manage Movies</div>
            <div className="flex justify-end">
                <div className="add_manager">
                    <Button variant="contained" className="flex gap-2" onClick={handleCreateForm}>
                        <WidgetsIcon /> <span>ADD MOVIE</span>
                    </Button>
                </div>
            </div>
            <div className="content  w-full mt-5 ">
                <div className="header bg-white p-6 shadow-md flex gap-3">
                    <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="demo-simple-select-label"> Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genre}
                            label="Filter"
                            onChange={handleChangeGenre}
                            size="small"
                        >
                            <MenuItem value={'ALL'}>ALL</MenuItem>
                            {genres?.genre?.map((item) => (
                                <MenuItem key={item.id} value={item.genreName}>
                                    {item.genreName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        fullWidth
                        label="Search"
                        name="search"
                        variant="outlined"
                        onChange={debouncing(handleChangeSearch, TIME_OUT)}
                    />
                </div>
                <div className="table w-full mt-5 shadow-md">
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="left">MOVIE NAME</TableCell>
                                    <TableCell align="left">DESCRIPTION</TableCell>
                                    <TableCell align="center">POSTER</TableCell>
                                    <TableCell align="center">GENRE</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                    <TableCell align="center" sx={{ width: '300px' }}>
                                        ACTIONS
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movies?.movies?.map((item, index) => {
                                    return (
                                        <TableRow
                                            key={item.movie?.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                            className="hover:bg-slate-100 transition-all duration-300"
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.movie.movieName}</TableCell>
                                            <TableCell align="left">{item.movie.description}</TableCell>
                                            <TableCell align="center">
                                                <img
                                                    src={item.movie.poster}
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                        margin: '0 auto',
                                                        borderRadius: '5px',
                                                    }}
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell align="center" style={{ maxWidth: '150px' }}>
                                                {item.genres.map((genre, index) => (
                                                    <div
                                                        key={index}
                                                        className="inline-flex items-center justify-center border border-gray-400 mb-1"
                                                        style={{
                                                            height: '20px',
                                                            borderRadius: '16px',
                                                        }}
                                                    >
                                                        <span className="ml-4">{genre.genreName}</span>
                                                        <FontAwesomeIcon
                                                            className="hover:cursor-pointer text-red-500 text-sm"
                                                            onClick={() => handleDeleteGenre(genre.id, item.movie.id)}
                                                            style={{ padding: '5px' }}
                                                            icon={faTrash}
                                                        />
                                                    </div>
                                                ))}
                                                <div
                                                    className="border border-gray-400 rounded-lg text-center bg-green-500 hover:cursor-pointer m-auto"
                                                    style={{
                                                        width: '50px',
                                                    }}
                                                    onClick={() => handleAddGenreForm(item.movie.id)}
                                                >
                                                    Add
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </div>
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.movie?.status ? (
                                                    <FontAwesomeIcon icon={faLockOpen} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faLock} />
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.movie?.status ? (
                                                    <div className="flex gap-2 justify-center">
                                                        <Button
                                                            variant="contained"
                                                            color="warning"
                                                            onClick={() => handleOpenEditInfo(item.movie)}
                                                        >
                                                            <Tooltip title="edit info">
                                                                <EditIcon />
                                                            </Tooltip>
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => handleOpenEditImage(item.movie)}
                                                        >
                                                            <Tooltip title="edit image">
                                                                <FilterIcon />
                                                            </Tooltip>
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleChangeStatusMovie(item.movie.id)}
                                                        >
                                                            <Tooltip title="lock">
                                                                <LockOutlinedIcon />
                                                            </Tooltip>
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => handleChangeStatusMovie(item.movie.id)}
                                                    >
                                                        <Tooltip title="unlock">
                                                            <LockOpenOutlinedIcon />
                                                        </Tooltip>
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="pagination flex justify-end py-5">
                    <Pagination
                        count={movies.totalPages}
                        page={movies.current}
                        color="primary"
                        hideNextButton
                        hidePrevButton
                        onChange={handleChangePage}
                    />
                </div>
            </div>
            {toggle && (
                <FormAddMovie toggle={toggle} handleCloseForm={handleCloseForm} handleLoadMovie={handleLoadMovie} />
            )}
            {openAddGenre && (
                <FormAddGenreToMovie
                    openAddGenre={openAddGenre}
                    handleCloseForm={handleCloseAddGenre}
                    handleLoadMovie={handleLoadMovie}
                    movieDetailId={movieDetailId}
                    currentPage={movies.current}
                />
            )}
            {openEditInfo && (
                <FormEditMovieInfo
                    openEditInfo={openEditInfo}
                    handleCloseEditInfo={handleCloseEditInfo}
                    editInfo={edit}
                    currentPage={movies.current}
                    handleLoadMovie={handleLoadMovie}
                />
            )}
            {openEditImage && (
                <FormEditImageMovie
                    openEditImage={openEditImage}
                    handleCloseEditImage={handleCloseEditImage}
                    editImage={edit}
                />
            )}
        </div>
    );
}

export default ManageMovie;
