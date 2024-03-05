import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "70vh",
  maxWidth: "70vw",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  "@media (max-width: 780px)": {
    maxWidth: "85vw",
  },
  "@media (max-width: 600px)": {
    maxWidth: "100vw",
  },
};

const ShowModal = ({
  open,
  handleClose,
  header,
  footer,
  children,
}: {
  open: boolean;
  children: ReactNode;
  handleClose: () => void;
  header?: string | ReactNode;
  footer?: string | ReactNode;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          invisible: false,
        },
      }}
    >
      <Box sx={modalStyle}>
        {header && (
          <Typography
            id="modal-modal-title"
            className="flex justify-center"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {header}
          </Typography>
        )}
        <div style={{ overflowY: "scroll" }}>{children}</div>
        {footer && (
          <Typography
            id="modal-modal-title"
            className="flex justify-center"
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}
          >
            {footer}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ShowModal;
