import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
import Resizer from 'react-image-file-resizer';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseLoading from '../../../@fuse/core/FuseLoading';

const Input = styled('input')({
  display: 'none',
});

const AvatarEdit = (props) => {
  const { register, src, className, handleSubmit } = props;
  console.log(`avatarEdit => handleSubmit => ${handleSubmit}`, handleSubmit);

  const dispatch = useDispatch();
  const { onChange, ...params } = register('avatarEdit');
  const methods = useFormContext();
  const { formState, trigger } = methods;
  const { errors } = formState;
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentCropper, setCurrentCropper] = useState('');

  // useEffect(() => {
  //   async function check() {
  //     console.log('avatarEdit => useEffect => errors', errors);
  //     console.log('avatarEdit => useEffect => errors.length', errors.avatarEdit);
  //     console.log('avatarEdit => useEffect => image', image);

  //     console.log('-------------------');

  //     if (errors.avatarEdit) {
  //       console.log('There be errors');
  //     } else if (image) {
  //       console.log('let us upload');
  //     } else {
  //       console.log('do nothing');
  //     }
  //     //   setCropperOpen(true);
  //     //   const resized = await resizeFile(image);
  //     // } else {
  //     //   console.log('something else happened');
  //     // }
  //   }
  //   check();
  // }, [image, errors]);
  const setSelectedImage = async (orig: any) => {
    setImage(undefined);
    setCropper(undefined);
    // e.preventDefault();

    setCropperOpen(true);
    // const orig = e.target.files[0];
    const resized = await resizeFile(orig);

    const reader = new FileReader();

    setImage(resized);

    // let files;
    // if (e.dataTransfer) {
    //   files = e.dataTransfer.files;
    // } else if (e.target) {
    //   files = e.target.files;
    // }
    // const reader = new FileReader();
    // reader.onload = async () => {
    //   const file = reader.result;
    //   const resized = await resizeFile(file);
    //   setImage(resized);
    // };
    // reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    // dispatch(closeDialog());
    setImage(undefined);
    if (typeof cropper !== 'undefined') {
      const data = cropper.getCroppedCanvas().toDataURL();
      setCropData(data);
      console.log(`getCropData => ${data.length}`);
      // setValue('logoPath', path, { shouldValidate: true });
      // handleSelect(data);
      handleSubmit(data);
    }
    setCropperOpen(false);
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        'PNG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
        600,
        600
      );
    });

  return (
    <>
      <div
        style={{
          borderWidth: 5,
          borderStyle: 'solid',
          borderColor: 'rgba(27, 35, 48, 1)',
          backgroundImage: `url(${src}`,
        }}
        className={className}
      >
        <label htmlFor="avatarEdit">
          <input
            {...params}
            accept="image/*"
            id="avatarEdit"
            name="avatarEdit"
            type="file"
            className="hidden"
            onChange={async (event) => {
              onChange(event);
              const result = await trigger('avatarEdit');
              console.log('result => ', result);
              if (result === true) {
                setSelectedImage(event.target.files[0]);
              } else {
                dispatch(
                  showMessage({
                    message: 'The image must be less than 10Mb.', // text or html
                    autoHideDuration: 3000, // ms
                    anchorOrigin: {
                      vertical: 'bottom', // top bottom
                      horizontal: 'left', // left center right
                    },
                    variant: 'error', // success error info warning null
                  })
                );
              }
            }}
          />
          <IconButton color="primary" aria-label="upload picture" component="div" className="mt-80">
            <PhotoCamera style={{ color: '#ffffff', height: 36, width: 28 }} />
          </IconButton>
        </label>
      </div>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Dialog open={cropperOpen} onClose={() => {}}>
          <DialogContent>
            {image && (
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
            )}
            {!image && <FuseLoading />}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCropperOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              disabled={!image}
              onClick={() => getCropData()}
              color="primary"
              variant="contained"
              autoFocus
            >
              Crop & Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AvatarEdit;
