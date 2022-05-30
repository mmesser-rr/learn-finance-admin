import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function ConfirmationDialog(props) {
  const { onClose, onOK, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);

  const handleEntering = () => {
    console.log('confirmationDialog => entering');
  };
  const handleCancel = () => {
    onClose();
  };

  async function handleOk() {
    // onClose(value);
    await onOK();
    onClose();
  }
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Are You Sure?</DialogTitle>
      <DialogContent dividers>
        This will remove this option from the sytem and cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
