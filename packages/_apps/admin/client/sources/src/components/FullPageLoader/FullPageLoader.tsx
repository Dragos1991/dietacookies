import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    boxShadow: 24,
    p: 4,
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
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: {
                        backgroundColor: "#fff",
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
                        enter: "0",
                        exit: "0.5s",
                    }}
                >
                    <Box sx={style}>
                        <CircularProgress />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
