import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GENRE } from '../../../redux/selectors/selectors';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import { GET_ALL_GENRE_NO_PAGE } from '../../../redux/api/service/genreService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { firebase_multiple_upload } from '../../../firebase/firebaseService';
import { post_add_movie } from '../../../redux/thunk/movieThunk';
import { validateBlank } from '../../../utils/validate';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

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

function FormAddMovie({ toggle, handleCloseForm, handleLoadMovie }) {
    const dispatch = useDispatch();

    const genres = useSelector(GENRE);

    // handle upload images
    const [images, setImages] = useState([]);
    const handleChangeUploadImage = (e) => {
        firebase_multiple_upload(e.target.files).then((resp) => {
            setImages([...images, ...resp]);
        });
    };

    // handle delete image
    const handleDeleteImage = (index) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    // handle select genreId
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const handleChangeGenreIds = (event) => {
        setSelectedGenreIds(event.target.value);
    };

    const [errorMovieName, setErrorMovieName] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorGenre, setErrorGenre] = useState('');
    const [errorImage, setErrorImage] = useState('');

    const resetError = () => {
        setErrorMovieName('');
        setErrorDescription('');
        setErrorGenre('');
        setErrorImage('');
    };

    const handleAddMovie = (e) => {
        e.preventDefault();

        const formMovie = {
            movieName: e.target.movieName.value,
            description: e.target.description.value,
            // poster: images,
            genreId: selectedGenreIds,
            status: true,
        };
        // validate
        if (validateBlank(formMovie.movieName)) {
            setErrorMovieName("Movie Name can't blank");
            return;
        }
        if (validateBlank(formMovie.description)) {
            setErrorDescription("Description can't blank");
            return;
        }
        if (formMovie.genreId.length == 0) {
            setErrorGenre("Genre can't blank");
            return;
        }
        // if (formMovie.poster.length === 0) {
        //     setErrorImage("Image can't be empty");
        //     return;
        // }

        // dispatch add movie
        dispatch(post_add_movie(formMovie)).then((resp) => {
            if (resp === true) {
                handleLoadMovie(0);
                handleCloseForm();
            } else {
                setErrorMovieName(resp);
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
            open={toggle}
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
                        onSubmit={handleAddMovie}
                    >
                        <TextField
                            error={errorMovieName}
                            label={errorMovieName ? errorMovieName : 'Movie Name'}
                            variant="filled"
                            size="small"
                            name="movieName"
                        />
                        <TextField
                            error={errorDescription}
                            label={errorDescription ? errorDescription : 'Description'}
                            multiline
                            rows={4}
                            variant="filled"
                            name="description"
                        />
                        <FormControl fullWidth size="small" error={errorGenre}>
                            <InputLabel id="demo-multiple-select-label">Genre</InputLabel>
                            <Select
                                labelId="demo-multiple-select-label"
                                id="demo-multiple-select"
                                multiple
                                value={selectedGenreIds}
                                onChange={handleChangeGenreIds}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {genres.genre.map((item) => {
                                    if (item.status) {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>
                                                <Checkbox checked={selectedGenreIds.includes(item.id)} />
                                                <ListItemText primary={item.genreName} />
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
                <Box
                    sx={
                        errorImage
                            ? {
                                  width: '436px',
                                  border: '2px dashed red',
                                  padding: '5px',
                                  borderRadius: '4px',
                              }
                            : {
                                  width: '436px',
                                  border: '2px dashed #000',
                                  padding: '5px',
                                  borderRadius: '4px',
                              }
                    }
                    className="bg-slate-100"
                >
                    {images.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                            {images.map((item, index) => {
                                return (
                                    <div key={index} className="relative">
                                        <img
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                display: 'block',
                                                border: '1px solid #000',
                                                borderRadius: '4px',
                                            }}
                                            src={item}
                                            alt=""
                                        />
                                        <div
                                            onClick={() => handleDeleteImage(index)}
                                            className="inset-0 absolute flex justify-center items-center opacity-0 hover:cursor-pointer hover:opacity-100 transition-all duration-300"
                                            style={{
                                                backgroundColor: 'rgba(0,0,0,0.4)',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <CloseIcon sx={{ color: 'red', fontSize: '30px' }} />
                                        </div>
                                    </div>
                                );
                            })}
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    border: '1px dashed #000',
                                    borderRadius: '4px',
                                }}
                                className="flex justify-center items-center bg-white"
                            >
                                <label htmlFor="images" className="hover:cursor-pointer">
                                    <CloudUploadIcon />
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id="images"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleChangeUploadImage}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <label htmlFor="images" className="hover:cursor-pointer">
                                <CloudUploadIcon sx={{ fontSize: '70px' }} />
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="images"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleChangeUploadImage}
                            />
                        </div>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}

export default FormAddMovie;
