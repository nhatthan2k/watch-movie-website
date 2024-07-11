import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { put_update_movie } from '../../../redux/thunk/movieThunk';
import { validateBlank } from '../../../utils/validate';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { firebase_single_upload } from '../../../firebase/firebaseService';

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

function FormEditMovieInfo({ openEditInfo, handleCloseEditInfo, editInfo, currentPage, handleLoadMovie }) {
    const dispatch = useDispatch();

    // handle upload images
    const [images, setImages] = useState(editInfo.poster);
    const handleChangeUploadImage = (e) => {
        firebase_single_upload(e.target.files[0]).then((resp) => {
            setImages(resp);
        });
    };

    // handle delete image
    const handleDeleteImage = () => {
        setImages("");
    };

    const [errorMovieName, setErrorMovieName] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorImage, setErrorImage] = useState('');

    const resetError = () => {
        setErrorMovieName('');
        setErrorDescription('');
        setErrorImage('');
    };

    const handleUpdateMovieInfo = (e) => {
        e.preventDefault();

        const formMovie = {
            movieName: e.target.movieName.value,
            description: e.target.description.value,
            poster: images,
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
        if (formMovie.poster.length === 0) {
            setErrorImage("Image can't be empty");
            return;
        }
        // dispatch update movie
        dispatch(put_update_movie({ formMovie, id: editInfo.id })).then((resp) => {
            if (resp === true) {
                handleLoadMovie(currentPage - 1);
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
                <Box 
                    sx={{
                        width: '300px',
                    }}
                >
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
                            <div className="relative">
                                <img
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        display: 'block',
                                        border: '1px solid #000',
                                        borderRadius: '4px',
                                    }}
                                    src={images}
                                    alt=""
                                />
                                <div
                                    onClick={() => handleDeleteImage()}
                                    className="inset-0 absolute flex justify-center items-center opacity-0 hover:cursor-pointer hover:opacity-100 transition-all duration-300"
                                    style={{
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <CloseIcon sx={{ color: 'red', fontSize: '30px' }} />
                                </div>
                            </div>
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

export default FormEditMovieInfo;
