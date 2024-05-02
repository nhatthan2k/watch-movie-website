import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MOVIE } from '../../../redux/selectors/selectors';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import { GET_ALL_MOVIE_NO_PAGE } from '../../../redux/api/service/movieService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { firebase_multiple_upload } from '../../../firebase/firebaseService';
import { post_add_season } from '../../../redux/thunk/seasonThunk';
import { validateBlank } from '../../../utils/validate';
import { Checkbox, ListItemText } from '@mui/material';

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

export const seasonTypes = ['MULTIPLE', 'SINGLE'];
export const seasonStatuses = ['COMING', 'SHOWING', 'COMPLETE'];
export const dayShowing = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function FormAddSeason({ toggle, handleCloseForm, handleLoadSeason }) {
    const dispatch = useDispatch();

    const movies = useSelector(MOVIE);

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

    // handle select movieId
    const [movieId, setMovieId] = useState(null);
    const handleChangeMovieId = (event) => {
        setMovieId(event.target.value);
    };

    // handle select seasonStatus
    const [seasonStatus, setSeasonStatus] = useState('');
    const handleChangeSeasonStatus = (event) => {
        setSeasonStatus(event.target.value);
    };

    // handle select seasonType
    const [seasonType, setSeasonType] = useState('');
    const handleChangeSeasonType = (event) => {
        setSeasonType(event.target.value);
    };

    // handle select Days
    const [selectedDays, setSelectedDays] = useState([]);
    const handleChangeDays = (event) => {
        setSelectedDays(event.target.value);
    };

    const [errorNickName, setErrorNickName] = useState('');
    const [errorSeasonName, setErrorSeasonName] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorMovie, setErrorMovie] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorSeasonType, setErrorSeasonType] = useState('');
    const [errorSeasonStatus, setErrorSeasonStatus] = useState('');
    const [errorDays, setErrorDays] = useState('');

    const resetError = () => {
        setErrorNickName('');
        setErrorSeasonName('');
        setErrorDescription('');
        setErrorMovie('');
        setErrorImage('');
        setErrorSeasonType('');
        setErrorSeasonStatus('');
        setErrorDays('');
    };

    const handleAddSeason = (e) => {
        e.preventDefault();

        const formSeason = {
            nickName: e.target.nickName.value,
            seasonName: e.target.seasonName.value,
            description: e.target.description.value,
            // avatar: images,
            movieId: movieId,
            status: true,
            seasonType: seasonType,
            seasonStatus: seasonStatus,
            days: selectedDays,
        };
        // validate
        if (validateBlank(formSeason.nickName)) {
            setErrorNickName("Nick Name can't blank");
            return;
        }
        if (validateBlank(formSeason.seasonName)) {
            setErrorSeasonName("Season Name can't blank");
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
        // if (formSeason.images.length === 0) {
        //     setErrorImage("Image can't be empty");
        //     return;
        // }
        if (validateBlank(formSeason.seasonType)) {
            setErrorSeasonType("Season Type can't blank");
            return;
        }
        if (validateBlank(formSeason.seasonStatus)) {
            setErrorSeasonStatus("Season Status can't blank");
            return;
        }
        if (formSeason.days.length === 0) {
            setErrorDays("Days can't blank");
            return;
        }

        // dispatch add season
        dispatch(post_add_season(formSeason)).then((resp) => {
            if (resp === true) {
                handleLoadSeason(0);
                handleCloseForm();
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
                        onSubmit={handleAddSeason}
                    >
                        <TextField
                            error={errorNickName}
                            label={errorNickName ? errorNickName : 'Nick Name'}
                            variant="filled"
                            size="small"
                            name="nickName"
                        />
                        <TextField
                            error={errorSeasonName}
                            label={errorSeasonName ? errorSeasonName : 'Season Name'}
                            variant="filled"
                            size="small"
                            name="seasonName"
                        />
                        <TextField
                            error={errorDescription}
                            label={errorDescription ? errorDescription : 'Description'}
                            multiline
                            rows={4}
                            variant="filled"
                            name="description"
                        />
                        <FormControl fullWidth size="small" error={errorMovie}>
                            <InputLabel id="demo-simple-select-label">Movie</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={movieId}
                                label="Movie"
                                onChange={handleChangeMovieId}
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
                        <FormControl fullWidth size="small" error={errorDays}>
                            <InputLabel id="demo-multiple-select-label">Day showing</InputLabel>
                            <Select
                                labelId="demo-multiple-select-label"
                                id="demo-multiple-select"
                                multiple
                                value={selectedDays}
                                onChange={handleChangeDays}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {dayShowing.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            <Checkbox checked={selectedDays.includes(item)} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    );
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

export default FormAddSeason;
