import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Controller, useFormContext } from 'react-hook-form';
// Mui
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
// Components
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

const Root = styled('div')(({ theme }) => ({
  '& .opportunityImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  '& .opportunityImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .opportunityImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .opportunityImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .opportunityImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .opportunityImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function OpportunityImagesTab(props) {
  const dispatch = useDispatch();
  /* Begin */
  const [imageLogo, setImageLogo] = useState(undefined);
  const [imageBG, setImageBG] = useState(undefined);
  const [currentCropper, setCurrentCropper] = useState('');
  const [cropDataLogo, setCropDataLogo] = useState();
  const [cropDataBG, setCropDataBG] = useState();
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);

  const onChangeLogo = (e: any) => {
    setCurrentCropper('logo');
    onChange(e, 'logo');
  };
  const onChangeBG = (e: any) => {
    setCurrentCropper('bg');
    onChange(e, 'bg');
  };
  const onChange = (e: any, source: String) => {
    if (source === 'logo') {
      setImageLogo(undefined);
    } else {
      setImageBG(undefined);
    }
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
      if (source === 'logo') {
        setImageLogo(reader.result);
      } else {
        setImageBG(reader.result);
      }
    };
    setCropperOpen(true);
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    // dispatch(closeDialog());
    if (typeof cropper !== 'undefined') {
      if (currentCropper === 'logo') {
        setCropDataLogo(cropper.getCroppedCanvas().toDataURL());
      } else {
        setCropDataBG(cropper.getCroppedCanvas().toDataURL());
      }
    }
    setCropperOpen(false);
  };

  const [open, setOpen] = useState(false);
  /* End */

  const methods = useFormContext();
  const { control, watch, setValue } = methods;

  const images = watch('images');

  return (
    <Root>
      <Typography variant="h5" className="mb-40 font-700">
        Upload Event Logo
      </Typography>
      <Box>
        <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item xs={6} md={3}>
            <Controller
              name="images"
              control={control}
              render={({ field: { _, value } }) => (
                <label
                  htmlFor="button-file-logo"
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file-logo"
                    type="file"
                    onChange={onChangeLogo}
                  />
                  <Box>
                    <Grid container spacing={0}>
                      <Container>
                        <Icon fontSize="large" color="action">
                          camera
                        </Icon>
                      </Container>
                    </Grid>
                    <Grid container spacing={0}>
                      <Container>
                        <Typography>Logo</Typography>
                      </Container>
                    </Grid>
                  </Box>
                </label>
              )}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            {cropDataLogo && (
              <Container maxWidth="sm">
                <img
                  style={{ height: '120px', width: '120px' }}
                  className="rounded-12 shadow hover:shadow-lg"
                  src={cropDataLogo}
                  alt="cropped"
                />
              </Container>
            )}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" className="mb-40 font-700">
        Upload Background
      </Typography>
      <Box>
        <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item xs={6} md={3}>
            <Controller
              name="images"
              control={control}
              render={({ field: { _, value } }) => (
                <label
                  htmlFor="button-file-bg"
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file-bg"
                    type="file"
                    onChange={onChangeBG}
                  />
                  <Box>
                    <Grid container spacing={0}>
                      <Container>
                        <Icon fontSize="large" color="action">
                          landscape
                        </Icon>
                      </Container>
                    </Grid>
                    <Grid container spacing={0}>
                      <Container>
                        <Typography>Background</Typography>
                      </Container>
                    </Grid>
                  </Box>
                </label>
              )}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            {cropDataBG && (
              <Container maxWidth="sm">
                <img
                  style={{ height: '120px', width: '213px' }}
                  className="rounded-12 shadow hover:shadow-lg"
                  src={cropDataBG}
                  alt="cropped"
                />
              </Container>
            )}
          </Grid>
        </Grid>
      </Box>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Dialog open={cropperOpen} onClose={() => {}}>
          <DialogContent>
            <Cropper
              style={{ height: '100%', width: '100%' }}
              zoomTo={0.2}
              initialAspectRatio={currentCropper === 'logo' ? 1 : 16 / 9}
              aspectRatio={currentCropper === 'logo' ? 1 : 16 / 9}
              src={currentCropper === 'logo' ? imageLogo : imageBG}
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
    </Root>
  );
}

export default OpportunityImagesTab;
