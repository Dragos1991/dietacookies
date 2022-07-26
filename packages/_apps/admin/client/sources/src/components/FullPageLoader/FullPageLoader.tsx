import { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
};

export function FullPageLoader({ loading }: any) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setOpen(loading);
            }, 500);
        }
    }, [loading]);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                style: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Fade
                timeout={{
                    exit: 500,
                    enter: 0,
                }}
                in={open}
                easing={{
                    enter: '0',
                    exit: '0.5s',
                }}
            >
                <Box sx={style}>
                    <CircularProgress />
                </Box>
            </Fade>
        </Modal>
    );
}
