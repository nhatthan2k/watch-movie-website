import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
                    <Button type="submit" variant="contained" fullWidth>
                        UPDATE
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default FormEditMovieInfo;
