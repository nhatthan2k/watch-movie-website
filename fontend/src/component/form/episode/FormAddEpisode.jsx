import { numberPrice, validateBlank } from '../../../utils/validate';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { post_add_episode } from '../../../redux/thunk/episodeThunk';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '6px',
};

function FormAddEpisode({ toggleAdd, handleCloseAddEpisode, seasonId }) {
    const dispatch = useDispatch();

    // error
    const [errorNumberEpisode, setErrorNumberEpisode] = useState('');
    const [errorSource, setErrorSource] = useState('');

    const resetError = () => {
        setErrorNumberEpisode('');
        setErrorSource('');
    };

    // handle add season detail
    const handleAddEpisode = (e) => {
        e.preventDefault();
        const formEpisode = {
            numberEpisode: parseInt(e.target.numberEpisode.value),
            source: e.target.source.value,
            seasonId: seasonId,
            status: true,
        };
        // validate
        if (validateBlank(formEpisode.numberEpisode)) {
            setErrorNumberEpisode("numberEpisode can't blank");
            return;
        }
        if (validateBlank(formEpisode.source)) {
            setErrorSource("source can't blank");
            return;
        }
        if (numberPrice(formEpisode.numberEpisode)) {
            setErrorNumberEpisode('numberEpisode must be than 0');
            return;
        }

        console.log(formEpisode);
        // dispatch
        dispatch(post_add_episode(formEpisode)).then(() => {
            handleCloseAddEpisode();
        });
        resetError();
    };

    return (
        <Modal
            open={toggleAdd}
            onClose={handleCloseAddEpisode}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form action="" className="flex flex-col gap-3" onSubmit={handleAddEpisode}>
                    <TextField
                        error={errorNumberEpisode}
                        name="numberEpisode"
                        label={errorNumberEpisode ? errorNumberEpisode : 'NumberEpisode'}
                        variant="filled"
                        size="small"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        error={errorSource}
                        name="source"
                        label={errorSource ? errorSource : 'Source'}
                        variant="filled"
                        size="small"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        ADD
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default FormAddEpisode;
