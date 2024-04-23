import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GENRE } from '../../../redux/selectors/selectors';
import FormControl from '@mui/material/FormControl';
import { GET_ALL_GENRE } from '../../../redux/api/service/genreService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { put_update_movie } from '../../../redux/thunk/movieThunk';
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

function FormEditMovieInfo({ openEditInfo, handleCloseEditInfo, editInfo }) {
    const dispatch = useDispatch();

    const genres = useSelector(GENRE);

    // handle select genreId
    const [genreId, setGenreId] = useState(editInfo.genre.id);
    const handleChangeGenreId = (event) => {
        setGenreId(event.target.value);
    };

    const [errorMovieName, setErrorMovieName] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const resetError = () => {
        setErrorMovieName('');
        setErrorDescription('');
    };

    const handleUpdateMovieInfo = (e) => {
        e.preventDefault();
        const formMovie = {
            movieName: e.target.movieName.value,
            description: e.target.description.value,
            genreId: genreId,
            status: true,
        };
        // validate
        if (validateBlank(formMovie.movieName)) {
            setErrorMovieName("movie Name can't blank");
            return;
        }
        if (validateBlank(formMovie.description)) {
            setErrorDescription("Description can't blank");
            return;
        }
        // dispatch update movie
        dispatch(put_update_movie({ formMovie, id: editInfo.id })).then((resp) => {
            if (resp === true) {
                handleCloseEditInfo();
            } else {
                setErrorMovieName(resp);
            }
        });
        resetError();
    };

    useEffect(() => {
        resetError();
        dispatch(GET_ALL_GENRE(''));
    }, []);

    return (
        <Modal
            open={openEditInfo}
            onClose={handleCloseEditInfo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form action="" className="flex flex-col gap-2" onSubmit={handleUpdateMovieInfo}>
                    <TextField
                        error={errorMovieName}
                        label={errorMovieName ? errorMovieName : 'Movie Name'}
                        variant="filled"
                        size="small"
                        name="movieName"
                        defaultValue={editInfo.movieName}
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
                        <InputLabel id="demo-simple-select-label">GENRE</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genreId}
                            label="Genre"
                            onChange={handleChangeGenreId}
                            defaultValue={editInfo.Genre.id}
                            autoFocus
                        >
                            {genres.genres.map((item) => {
                                if (item.status) {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.genreName}
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

export default FormEditMovieInfo;
