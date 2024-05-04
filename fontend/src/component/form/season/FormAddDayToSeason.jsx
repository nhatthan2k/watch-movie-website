import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import { validateBlank } from '../../../utils/validate';
import { post_add_day_to_season } from '../../../redux/thunk/seasonThunk';
import { dayShowing } from './FormAddSeason';

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

function FormAddDayToSeason({ openAddDay, handleCloseForm, handleLoadSeason, seasonDetailId, currentPage }) {
    const dispatch = useDispatch();

    // handle select dayName
    const [dayName, setDayName] = useState('');
    const handleChangeDayName = (event) => {
        setDayName(event.target.value);
    };

    const [errorDay, setErrorDay] = useState('');

    const resetError = () => {
        setErrorDay('');
    };

    const handleAddDayToSeason = (e) => {
        e.preventDefault();

        const formAddDayToSeason = {
            dayName: dayName,
        };

        // validate
        if (validateBlank(formAddDayToSeason.dayName)) {
            setErrorDay("day can't blank");
            return;
        }

        // dispatch add day to season
        dispatch(post_add_day_to_season({ formAddDayToSeason, seasonDetailId })).then((resp) => {
            if (resp === true) {
                handleLoadSeason(currentPage - 1);
                handleCloseForm();
            }
            // else {
            //     setErrorDay(resp);
            // }
        });

        resetError();
    };

    return (
        <Modal
            open={openAddDay}
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
                        onSubmit={handleAddDayToSeason}
                    >
                        <FormControl fullWidth size="small" error={errorDay}>
                            <InputLabel id="demo-multiple-select-label">Day Showing</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dayName}
                                onChange={handleChangeDayName}
                            >
                                {dayShowing.map((item) => {
                                    return (
                                        <MenuItem key={item} value={item}>
                                            {item}
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
            </Box>
        </Modal>
    );
}

export default FormAddDayToSeason;
