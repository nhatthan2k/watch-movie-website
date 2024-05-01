import { MOVIE, SEASON } from '../../../redux/selectors/selectors';
import { TIME_OUT, debouncing } from '../../../utils/deboucing';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import FilterIcon from '@mui/icons-material/Filter';
import FormAddSeason from '../../../component/form/season/FormAddSeason';
import FormControl from '@mui/material/FormControl';
import FormEditImageSeason from '../../../component/form/season/FormEditImageSeason';
import FormEditSeasonInfo from '../../../component/form/season/FormEditSeasonInfo';
import { GET_ALL_MOVIE_NO_PAGE } from '../../../redux/api/service/movieService';
import { GET_ALL_SEASON } from '../../../redux/api/service/seasonService';
import InputLabel from '@mui/material/InputLabel';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import ShowEpisode from '../../../component/modal/ShowEpisode';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { changeCurrentPage } from '../../../redux/reducers/seasonSlice';
import { put_status_season } from '../../../redux/thunk/seasonThunk';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ManageSeason() {
    const dispatch = useDispatch();
    const movies = useSelector(MOVIE);
    const seasons = useSelector(SEASON);

    console.log('season-->', seasons);
    console.log('movie-->', movies);

    // handle add new season
    const [toggle, setToggle] = useState(false);
    const handleCreateForm = () => setToggle(true);
    const handleCloseForm = () => setToggle(false);

    // data edit
    const [edit, setEdit] = useState(null);

    // handle edit info season
    const [openEditInfo, setOpenEditInfo] = useState(false);
    const handleOpenEditInfo = (item) => {
        setEdit(item);
        setOpenEditInfo(true);
    };
    const handleCloseEditInfo = () => setOpenEditInfo(false);

    // handle edit image season
    const [openEditImage, setOpenEditImage] = useState(false);
    const handleOpenEditImage = (item) => {
        setEdit(item);
        setOpenEditImage(true);
    };
    const handleCloseEditImage = () => setOpenEditImage(false);

    // handle change status season
    const handleChangeStatusSeason = (id) => {
        dispatch(put_status_season(id));
    };

    // handle open episode
    const [seasonId, setSeasonId] = useState(null);

    const [openEpisode, setOpenEpisode] = useState(false);
    const handleOpenEpisode = (item) => {
        setSeasonId(item.id);
        setOpenEpisode(true);
    };
    const handleCloseEpisode = () => setOpenEpisode(false);

    // handle filter by movie
    const [movie, setMovie] = useState('ALL');
    const handleChangeMovie = (event) => {
        setMovie(event.target.value);
    };

    // handle search
    const [search, setSearch] = useState('');
    const handleChangeSearch = (e) => setSearch(e.target.value);

    // handle change page
    const handleChangePage = (e, value) => {
        dispatch(changeCurrentPage(value));
    };

    // handle load season
    const handleLoadSeason = (newPage) => {
        dispatch(GET_ALL_SEASON({ search, movie, page: newPage }));
    };

    useEffect(() => {
        dispatch(GET_ALL_MOVIE_NO_PAGE(''));
        handleLoadSeason(seasons.current - 1);
    }, [search, movie, seasons.current]);

    return (
        <div>
            <div className="flex justify-center text-3xl font-semibold uppercase">Manage Seasons</div>
            <div className="flex justify-end">
                <div className="add_manager">
                    <Button variant="contained" className="flex gap-2" onClick={handleCreateForm}>
                        <WidgetsIcon /> <span>ADD SEASON</span>
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
                            value={movie}
                            label="Filter"
                            onChange={handleChangeMovie}
                            size="small"
                        >
                            <MenuItem value={'ALL'}>ALL</MenuItem>
                            {movies.movies.map((item, index) => (
                                <MenuItem key={index} value={item.movieName}>
                                    {item.movieName}
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
                                    <TableCell align="left">SEASON NAME</TableCell>
                                    <TableCell align="left">DESCRIPTION</TableCell>
                                    <TableCell align="center">IMAGE</TableCell>
                                    <TableCell align="center">MOVIE</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                    <TableCell align="center" sx={{ width: '300px' }}>
                                        ACTIONS
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {seasons.seasons.map((item, index) => {
                                    return (
                                        <TableRow
                                            key={item?.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                            className="hover:bg-slate-100 transition-all duration-300"
                                        >
                                            <TableCell align="center" onClick={() => handleOpenEpisode(item)}>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left" onClick={() => handleOpenEpisode(item)}>
                                                {item.seasonName.toUpperCase()}
                                            </TableCell>
                                            <TableCell align="left" onClick={() => handleOpenEpisode(item)}>
                                                {item.description}
                                            </TableCell>
                                            <TableCell align="center" onClick={() => handleOpenEpisode(item)}>
                                                <img
                                                    src={item.image}
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
                                            <TableCell align="center" onClick={() => handleOpenEpisode(item)}>
                                                {item.movie.movieName}
                                            </TableCell>
                                            <TableCell align="center" onClick={() => handleOpenEpisode(item)}>
                                                {item?.status ? (
                                                    <FontAwesomeIcon icon={faLockOpen} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faLock} />
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item?.status ? (
                                                    <div className="flex gap-2 justify-center">
                                                        <Button
                                                            variant="contained"
                                                            color="warning"
                                                            onClick={() => handleOpenEditInfo(item)}
                                                        >
                                                            <Tooltip title="edit info">
                                                                <EditIcon />
                                                            </Tooltip>
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => handleOpenEditImage(item)}
                                                        >
                                                            <Tooltip title="edit image">
                                                                <FilterIcon />
                                                            </Tooltip>
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleChangeStatusSeason(item.id)}
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
                                                        onClick={() => handleChangeStatusSeason(item.id)}
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
                        count={seasons.totalPages}
                        page={seasons.current}
                        color="primary"
                        hideNextButton
                        hidePrevButton
                        onChange={handleChangePage}
                    />
                </div>
            </div>
            {toggle && (
                <FormAddSeason toggle={toggle} handleCloseForm={handleCloseForm} handleLoadSeason={handleLoadSeason} />
            )}
            {openEditInfo && (
                <FormEditSeasonInfo
                    openEditInfo={openEditInfo}
                    handleCloseEditInfo={handleCloseEditInfo}
                    editInfo={edit}
                />
            )}
            {openEditImage && (
                <FormEditImageSeason
                    openEditImage={openEditImage}
                    handleCloseEditImage={handleCloseEditImage}
                    editImage={edit}
                />
            )}
            {openEpisode && (
                <ShowEpisode openEpisode={openEpisode} handleCloseEpisode={handleCloseEpisode} seasonId={seasonId} />
            )}
        </div>
    );
}

export default ManageSeason;
