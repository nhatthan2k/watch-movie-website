import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { put_update_genre } from '../../../redux/thunk/genreThunk';
import { useDispatch } from 'react-redux';
import { validateBlank } from '../../../utils/validate';

function FormEditGenre({ handleCloseForm, edit, setLoadGenrePage, loadGenrePage }) {
    const dispatch = useDispatch();

    const [genreName, setGenreName] = useState('');

    const [errorGenreName, setErrorGenreName] = useState('');

    const handleUpdateGenre = () => {
        const formGenre = {
            genreName,
            status: true,
        };
        if (validateBlank(formGenre.genreName)) {
            setErrorGenreName("you can't blank genre name");
            return;
        }
        dispatch(put_update_genre({ formGenre, id: edit.id })).then((resp) => {
            if (resp === true) {
                setLoadGenrePage(!loadGenrePage);
                handleCloseForm();
            } else {
                setErrorGenreName(resp);
            }
        });
    };

    useEffect(() => {
        setGenreName(edit.genreName);
    }, []);

    return (
        <TableRow>
            {console.log(edit)}
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
                    defaultValue={edit.genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                />
            </TableCell>
            <TableCell align="center">
                <i className="fa-solid fa-lock-open"></i>
            </TableCell>
            <TableCell align="center">
                <Button variant="contained" onClick={handleUpdateGenre}>
                    UPDATE
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default FormEditGenre;
