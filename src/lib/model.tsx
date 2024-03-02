import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import { ReactNode } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const ShowModal = ({
  open,
  handleClose,
  header,
  footer,
  children,
}: {
  open: boolean;
  handleClose: () => void;
  header?: string | ReactNode;
  footer?: string | ReactNode;
  children: ReactNode;
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
          // onClick: null, // Disables the click event
        },
      }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          className="flex justify-center"
          variant="h6"
          component="h2"
        >
          {header}
        </Typography>
        {children}
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
