import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MOVIE } from '../../../redux/selectors/selectors';
import FormControl from '@mui/material/FormControl';
import { GET_ALL_MOVIE } from '../../../redux/api/service/movieService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { put_update_season } from '../../../redux/thunk/seasonThunk';
import { validateBlank } from '../../../utils/validate';

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

function FormEditSeasonInfo({ openEditInfo, handleCloseEditInfo, editInfo }) {
    const dispatch = useDispatch();

    const movies = useSelector(MOVIE);

    // handle select movieId
    const [movieId, setMovieId] = useState(editInfo.movie.id);
    const handleChangeMovieId = (event) => {
        setMovieId(event.target.value);
    };

    const [errorSeasonName, setErrorSeasonName] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const resetError = () => {
        setErrorSeasonName('');
        setErrorDescription('');
    };

    const handleUpdateSeasonInfo = (e) => {
        e.preventDefault();
        const formSeason = {
            seasonName: e.target.seasonName.value,
            description: e.target.description.value,
            movieId: movieId,
            status: true,
        };
        // validate
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
                handleCloseEditInfo();
            } else {
                setErrorSeasonName(resp);
            }
        });
        resetError();
    };

    useEffect(() => {
        resetError();
        dispatch(GET_ALL_MOVIE(''));
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
                            defaultValue={editInfo.Movie.id}
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
                    <Button type="submit" variant="contained" fullWidth>
                        UPDATE
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default FormEditSeasonInfo;
