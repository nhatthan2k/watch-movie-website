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
import { firebase_single_upload } from '../../../firebase/firebaseService';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

function FormEditSeasonInfo({ openEditInfo, handleCloseEditInfo, editInfo, handleLoadSeason, currentPage }) {
    console.log(editInfo);

    const dispatch = useDispatch();

    const movies = useSelector(MOVIE);

    // handle upload images
    const [images, setImages] = useState(editInfo.avatar);
    const handleChangeUploadImage = (e) => {
        firebase_single_upload(e.target.files[0]).then((resp) => {
            setImages(resp);
        });
    };

    // handle delete image
    const handleDeleteImage = () => {
        setImages("");
    };

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
    const [errorMovie, setErrorMovie] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorSeasonType, setErrorSeasonType] = useState('');
    const [errorSeasonStatus, setErrorSeasonStatus] = useState('');

    const resetError = () => {
        setErrorNickName('');
        setErrorSeasonName('');
        setErrorDescription('');
        setErrorMovie('');
        setErrorImage('');
        setErrorSeasonType('');
        setErrorSeasonStatus('');
    };

    const handleUpdateSeasonInfo = (e) => {
        e.preventDefault();
        const formSeason = {
            nickName: e.target.nickName.value,
            seasonName: e.target.seasonName.value,
            description: e.target.description.value,
            avatar: images,
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
        if (formSeason.movieId === null) {
            setErrorMovie("Movie can't blank");
            return;
        }
        if (formSeason.avatar.length === 0) {
            setErrorImage("Image can't be empty");
            return;
        }
        if (validateBlank(formSeason.seasonType)) {
            setErrorSeasonType("Season Type can't blank");
            return;
        }
        if (validateBlank(formSeason.seasonStatus)) {
            setErrorSeasonStatus("Season Status can't blank");
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
                <Box
                    sx={{
                        width: '300px',
                    }}
                >
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
                    <FormControl fullWidth size="small" error={errorMovie}>
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
                    <FormControl fullWidth size="small" error={errorSeasonType}>
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
                    <FormControl fullWidth size="small" error={errorSeasonStatus}>
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

export default FormEditSeasonInfo;
