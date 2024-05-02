import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MOVIE } from '../../../redux/selectors/selectors';
import FormControl from '@mui/material/FormControl';
import { GET_ALL_MOVIE_NO_PAGE } from '../../../redux/api/service/movieService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { put_update_season } from '../../../redux/thunk/seasonThunk';
import { validateBlank } from '../../../utils/validate';
import { seasonTypes, seasonStatuses } from './FormAddSeason';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 350,
    borderRadius: '8px',
    p: 2,
};

function FormEditSeasonInfo({ openEditInfo, handleCloseEditInfo, editInfo, handleLoadSeason, currentPage }) {
    console.log(editInfo);

    const dispatch = useDispatch();

    const movies = useSelector(MOVIE);

    // handle select movieId
    const [movieId, setMovieId] = useState(editInfo.movie.id);
    const handleChangeMovieId = (event) => {
        setMovieId(event.target.value);
    };

    // handle select seasonStatus
    const [seasonStatus, setSeasonStatus] = useState(editInfo.seasonStatus);
    const handleChangeSeasonStatus = (event) => {
        setSeasonStatus(event.target.value);
    };

    // handle select seasonType
    const [seasonType, setSeasonType] = useState(editInfo.seasonType);
    const handleChangeSeasonType = (event) => {
        setSeasonType(event.target.value);
    };

    const [errorNickName, setErrorNickName] = useState('');
    const [errorSeasonName, setErrorSeasonName] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const resetError = () => {
        setErrorNickName('');
        setErrorSeasonName('');
        setErrorDescription('');
    };

    const handleUpdateSeasonInfo = (e) => {
        e.preventDefault();
        const formSeason = {
            nickName: e.target.nickName.value,
            seasonName: e.target.seasonName.value,
            description: e.target.description.value,
            movieId: movieId,
            status: true,
            seasonType: seasonType,
            seasonStatus: seasonStatus,
        };
        // validate
        if (validateBlank(formSeason.nickName)) {
            setErrorNickName("Nick Name can't blank");
            return;
        }
        if (validateBlank(formSeason.seasonName)) {
            setErrorSeasonName("season Name can't blank");
            return;
        }
        if (validateBlank(formSeason.description)) {
            setErrorDescription("Description can't blank");
            return;
        }
        // dispatch update season
        dispatch(put_update_season({ formSeason, id: editInfo.id })).then((resp) => {
            if (resp === true) {
                handleLoadSeason(currentPage - 1);
                handleCloseEditInfo();
            } else {
                setErrorNickName(resp);
            }
        });
        resetError();
    };

    useEffect(() => {
        resetError();
        dispatch(GET_ALL_MOVIE_NO_PAGE(''));
    }, []);

    return (
        <Modal
            open={openEditInfo}
            onClose={handleCloseEditInfo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form action="" className="flex flex-col gap-2" onSubmit={handleUpdateSeasonInfo}>
                    <TextField
                        error={errorNickName}
                        label={errorNickName ? errorNickName : 'Nick Name'}
                        variant="filled"
                        size="small"
                        name="nickName"
                        defaultValue={editInfo.nickName}
                        fullWidth
                    />
                    <TextField
                        error={errorSeasonName}
                        label={errorSeasonName ? errorSeasonName : 'Season Name'}
                        variant="filled"
                        size="small"
                        name="seasonName"
                        defaultValue={editInfo.seasonName}
                        fullWidth
                    />
                    <TextField
                        error={errorDescription}
                        label={errorDescription ? errorDescription : 'Description'}
                        multiline
                        rows={4}
                        variant="filled"
                        name="description"
                        defaultValue={editInfo.description}
                        fullWidth
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">MOVIE</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={movieId}
                            label="Movie"
                            onChange={handleChangeMovieId}
                            defaultValue={editInfo.movie.id}
                            autoFocus
                        >
                            {movies.movies.map((item) => {
                                if (item.status) {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.movieName}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Season Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={seasonType}
                            label="seasonType"
                            onChange={handleChangeSeasonType}
                            defaultValue={editInfo.seasonType}
                            autoFocus
                        >
                            {seasonTypes.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Season Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={seasonStatus}
                            label="seasonStatus"
                            onChange={handleChangeSeasonStatus}
                            defaultValue={editInfo.seasonStatus}
                            autoFocus
                        >
                            {seasonStatuses.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" fullWidth>
                        UPDATE
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default FormEditSeasonInfo;
