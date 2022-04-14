import { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const Input = styled('input')({
  display: 'none',
});

const AvatarEdit = (props) => {
  const { handleSelect, className } = props;
  console.log('avatarEdit => className', className);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentCropper, setCurrentCropper] = useState('');

  const onImageSelect = (e: any) => {
    console.log('avatarEdit => onImageSelect');
    setImage(undefined);
    setCropper(undefined);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    setCropperOpen(true);
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    // dispatch(closeDialog());
    if (typeof cropper !== 'undefined') {
      const data = cropper.getCroppedCanvas().toDataURL();
      setCropData(data);
      console.log(`getCropData => ${data.length}`);
      // setValue('logoPath', path, { shouldValidate: true });
      handleSelect(data);
    }
    setCropperOpen(false);
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${props.src}` }} className={className}>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" onChange={onImageSelect} />
          <IconButton color="primary" aria-label="upload picture" component="div" className="mt-80">
            <PhotoCamera style={{ color: '#ffffff', height: 36, width: 28 }} />
          </IconButton>
        </label>
      </div>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Dialog open={cropperOpen} onClose={() => {}}>
          <DialogContent>
            <Cropper
              style={{ height: '100%', width: '100%' }}
              zoomTo={0.2}
              initialAspectRatio={1}
              aspectRatio={1}
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCropperOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => getCropData()} color="primary" variant="contained" autoFocus>
              Crop & Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AvatarEdit;
