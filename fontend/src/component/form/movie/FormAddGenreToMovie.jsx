import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GENRE } from '../../../redux/selectors/selectors';
import FormControl from '@mui/material/FormControl';
import { GET_ALL_GENRE_NO_PAGE } from '../../../redux/api/service/genreService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import { validateBlank } from '../../../utils/validate';
import { post_add_genre_to_movie } from '../../../redux/thunk/movieThunk';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 2,
    display: 'flex',
    gap: '10px',
};

function FormAddGenreToMovie({ openAddGenre, handleCloseForm, handleLoadMovie, movieDetailId, currentPage }) {
    const dispatch = useDispatch();

    const genres = useSelector(GENRE);

    // handle select genreId
    const [genreId, setGenreId] = useState(null);
    const handleChangeGenreId = (event) => {
        setGenreId(event.target.value);
    };

    const [errorGenre, setErrorGenre] = useState('');

    const resetError = () => {
        setErrorGenre('');
    };

    const handleAddGenreToMovie = (e) => {
        e.preventDefault();

        const formAddGenreToMovie = {
            id: genreId,
        };

        // validate
        if (validateBlank(formAddGenreToMovie.id)) {
            setErrorGenre("Genre can't blank");
            return;
        }

        // dispatch add movie
        dispatch(post_add_genre_to_movie({ formAddGenreToMovie, movieDetailId })).then((resp) => {
            if (resp == true) {
                handleLoadMovie(currentPage - 1);
                handleCloseForm();
            } else {
                setErrorGenre(resp);
            }
        });

        resetError();
    };

    useEffect(() => {
        resetError();
        dispatch(GET_ALL_GENRE_NO_PAGE(''));
    }, []);

    return (
        <Modal
            open={openAddGenre}
            onClose={handleCloseForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        width: '300px',
                    }}
                >
                    <form
                        style={{
                            border: '1px dashed #000',
                            padding: '5px',
                            borderRadius: '4px',
                        }}
                        action=""
                        className="flex flex-col gap-2"
                        onSubmit={handleAddGenreToMovie}
                    >
                        <FormControl fullWidth size="small" error={errorGenre}>
                            <InputLabel id="demo-multiple-select-label">Genre</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genreId}
                                onChange={handleChangeGenreId}
                            >
                                {genres.genre.map((item) => {
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
                        <Button type="submit" variant="contained">
                            ADD
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
}

export default FormAddGenreToMovie;
