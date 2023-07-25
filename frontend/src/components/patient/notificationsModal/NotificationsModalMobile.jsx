import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import "./NotificationsModalMobile.css";

const style = {
  position: "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid var(--dark-blue)",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ infosText }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledEngineProvider injectFirst>
      <div
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          right: "20%",
          bottom: "20%",
        }}
      >
        <button
          type="button"
          onClick={handleOpen}
          className="modalButton"
          aria-label="Open Notifications Modal"
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="titleModalStyle"
            >
              Notifications
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "var(--dark-blue)" }}
            >
              {infosText}
            </Typography>
          </Box>
        </Modal>
      </div>
    </StyledEngineProvider>
  );
}

BasicModal.propTypes = {
  infosText: PropTypes.string.isRequired,
};
