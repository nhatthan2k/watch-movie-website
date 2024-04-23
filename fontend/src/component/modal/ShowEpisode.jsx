import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import FormAddEpisode from '../form/episode/FormAddEpisode';
import FormEditEpisode from '../form/episode/FormEditEpisode';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { put_status_episode } from '../../redux/thunk/episodeThunk';
import { GET_ALL_EPISODE } from '../../redux/api/service/episodeService';
import { useDispatch, useSelector } from 'react-redux';
import { EPISODE } from '../../redux/selectors/selectors';
import { useState, useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '6px',
    boxShadow: 24,
    // p: 2,
    overflow: 'hidden',
};

function ShowEpisode({ openEpisode, handleCloseEpisode, seasonId }) {
    const dispatch = useDispatch();

    const listEpisode = useSelector(EPISODE);

    // handle open add episode to season
    const [toggleAdd, setToggleAdd] = useState(false);
    const handleOpenAddEpisode = () => setToggleAdd(true);
    const handleCloseAddEpisode = () => setToggleAdd(false);

    // handle open edit episode in season
    const [edit, setEdit] = useState(null);
    const [toggleEdit, setToggleEdit] = useState(false);
    const handleOpenEditEpisode = (item) => {
        setEdit(item);
        setToggleEdit(true);
    };
    const handleCloseEditEpisode = () => setToggleEdit(false);

    // handle get episode by seasonId
    useEffect(() => {
        dispatch(GET_ALL_EPISODE(seasonId));
    }, []);

    // handle change status episode
    const handleChangeStatusEpisode = (idEpisode) => {
        dispatch(put_status_episode(idEpisode));
    };

    return (
        <>
            <Modal
                open={openEpisode}
                onClose={handleCloseEpisode}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">NUMBER EPISODE</TableCell>
                                <TableCell align="center">ROURCE</TableCell>
                                <TableCell align="center">STATUS</TableCell>
                                <TableCell align="center" sx={{ width: '180px' }}>
                                    ACTIONS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listEpisode.map((item, index) => {
                                return (
                                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{item.numberEpisode.toLocaleString()}</TableCell>
                                        <TableCell align="center">{item.source}</TableCell>
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
                                                        variant="contained"
                                                        color="warning"
                                                        onClick={() => handleOpenEditEpisode(item)}
                                                    >
                                                        <Tooltip title="edit">
                                                            <EditIcon />
                                                        </Tooltip>
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleChangeStatusEpisode(item.id)}
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
                                                    onClick={() => handleChangeStatusEpisode(item.id)}
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
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    onClick={handleOpenAddEpisode}
                                    colSpan={8}
                                    align="center"
                                    className="hover:cursor-pointer hover:bg-slate-200 transition-all duration-300"
                                >
                                    <AddCircleOutlineIcon />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Modal>
            {toggleAdd && (
                <FormAddEpisode
                    toggleAdd={toggleAdd}
                    handleCloseAddEpisode={handleCloseAddEpisode}
                    seasonId={seasonId}
                />
            )}
            {toggleEdit && (
                <FormEditEpisode
                    toggleEdit={toggleEdit}
                    handleCloseEditEpisode={handleCloseEditEpisode}
                    edit={edit}
                    seasonId={seasonId}
                />
            )}
        </>
    );
}

export default ShowEpisode;
