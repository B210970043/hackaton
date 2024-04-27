import { Modal, Box } from "@mui/material";
const CustomModal = ({
  open,
  setOpen,
  component: Component,
  setRoute,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setRoute("Login");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
