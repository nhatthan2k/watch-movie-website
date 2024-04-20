import { TIME_OUT, debouncing } from '../../../utils/deboucing';
import { disabledEditItem, enableEditItem, changeCurrentPage } from '../../../redux/reducers/genreSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { GENRE } from '../../../redux/selectors/selectors';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import FormAddGenre from '../../../component/form/genre/FormAddGenre';
import FormEditGenre from '../../../component/form/genre/FormEditGenre';
import { GET_ALL_GENRE } from '../../../redux/api/service/genreService';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import { put_status_genre } from '../../../redux/thunk/genreThunk';

function ManageGenre() {
    const dispatch = useDispatch();
    const genre = useSelector(GENRE);

    // handle add new Genre
    const [toggle, setToggle] = useState(false);
    const handleCreateForm = () => setToggle(true);
    const handleCloseForm = () => setToggle(false);

    // update
    const handleEditGenre = (id) => {
        dispatch(enableEditItem(id));
    };

    // change status
    const handleChangeStatusShip = (id) => {
        dispatch(put_status_genre(id));
    };

    // change page
    const handleChangePage = (e, value) => {
        dispatch(changeCurrentPage(value));
    };

    // search
    const [search, setSearch] = useState('');
    const handleChangeSearch = (e) => setSearch(e.target.value);

    useEffect(() => {
        dispatch(GET_ALL_GENRE({ search, page: genre.current - 1 }));
    }, [search, genre.current]);

    return (
        <div>
            <div className="flex justify-center text-3xl font-semibold uppercase">Manage Genre</div>
            <div className="flex justify-end">
                <div className="add_manager">
                    <Button variant="contained" className="flex gap-2" onClick={handleCreateForm}>
                        <CategoryIcon /> <span>ADD Genre</span>{' '}
                    </Button>
                </div>
            </div>
            <div className="content  w-full mt-5 ">
                <div className="header bg-white p-6 shadow-md">
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
                                    <TableCell align="center">GENRE NAME</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                    <TableCell align="center" sx={{ width: '300px' }}>
                                        ACTIONS
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {toggle && <FormAddGenre handleCloseForm={handleCloseForm} />}
                                {genre.genre.map((item, index) => {
                                    if (item?.isEdit) {
                                        return (
                                            <FormEditGenre
                                                key={item.id}
                                                handleCloseForm={() => dispatch(disabledEditItem())}
                                                edit={item}
                                            />
                                        );
                                    } else {
                                        return (
                                            <TableRow
                                                key={item?.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">
                                                    <p className="text-blue-700 uppercase underline hover:cursor-pointer">
                                                        {item?.genreName.toUpperCase()}
                                                    </p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item?.status ? (
                                                        <i className="fa-solid fa-lock-open"></i>
                                                    ) : (
                                                        <i className="fa-solid fa-lock"></i>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item?.status ? (
                                                        <div className="flex gap-2 justify-center">
                                                            <Button
                                                                onClick={() => handleEditGenre(item?.id)}
                                                                variant="contained"
                                                                color="warning"
                                                            >
                                                                <Tooltip title="edit">
                                                                    <EditIcon />
                                                                </Tooltip>
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleChangeStatusShip(item?.id)}
                                                                variant="contained"
                                                                color="error"
                                                            >
                                                                <Tooltip title="lock">
                                                                    <LockOutlinedIcon />
                                                                </Tooltip>
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            onClick={() => handleChangeStatusShip(item?.id)}
                                                            variant="contained"
                                                            color="success"
                                                        >
                                                            <Tooltip title="unlock">
                                                                <LockOpenOutlinedIcon />
                                                            </Tooltip>
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="pagination flex justify-end py-5">
                    <Pagination
                        count={genre.totalPages}
                        page={genre.current}
                        color="primary"
                        hideNextButton
                        hidePrevButton
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ManageGenre;
