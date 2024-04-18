import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { post_add_genre } from '../../../redux/thunk/genreThunk';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { validateBlank } from '../../../utils/validate';

function FormAddGenre({ handleCloseForm }) {
    const dispatch = useDispatch();

    const [genreName, setGenreName] = useState('');

    const [errorGenreName, setErrorGenreName] = useState('');

    const handleAddGenre = () => {
        const formGenre = {
            genreName,
            status: true,
        };
        // validate blank
        if (validateBlank(formGenre.genreName)) {
            setErrorGenreName("you can't blank genre name");
            return;
        }
        // dispatch add new genre
        dispatch(post_add_genre(formGenre)).then((resp) => {
            if (resp === true) {
                handleCloseForm();
            } else {
                setErrorGenreName(resp);
            }
        });
    };

    return (
        <TableRow>
            <TableCell align="center">
                <CloseIcon onClick={handleCloseForm} />
            </TableCell>
            <TableCell align="center">
                <TextField
                    error={errorGenreName}
                    autoFocus
                    fullWidth
                    size="small"
                    label={errorGenreName ? errorGenreName : 'genre Name'}
                    name="genreName"
                    variant="outlined"
                    onChange={(e) => setGenreName(e.target.value)}
                />
            </TableCell>
            <TableCell align="center">
                <i className="fa-solid fa-lock-open"></i>
            </TableCell>
            <TableCell align="center">
                <Button variant="contained" onClick={handleAddGenre}>
                    ADD
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default FormAddGenre;
