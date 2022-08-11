import { useState, useEffect } from 'react';
import { Storage } from "aws-amplify"
import { useFormContext, Controller } from 'react-hook-form';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHeader from '../../../shared-components/FormHeader';

function EventDetailsForm({ logoUriOrig, heroPhotoUriOrig }) {
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;

  const [originLogo, setOriginLogo] = useState(logoUriOrig);
  const [originBg, setOriginBg] = useState(heroPhotoUriOrig);
  const [imageLogo, setImageLogo] = useState(undefined);
  const [imageBG, setImageBG] = useState(undefined);
  const [currentCropper, setCurrentCropper] = useState('');
  const [cropDataLogo, setCropDataLogo] = useState();
  const [cropDataBG, setCropDataBG] = useState();
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);

  useEffect(() => {
    async function getImage() {
      if (logoUriOrig?.startsWith("events")) {
        const imgSrc = await Storage.get(logoUriOrig, { download: false });
        setOriginLogo(imgSrc);
      }

      if (heroPhotoUriOrig?.startsWith("events")) {
        const imgSrc = await Storage.get(heroPhotoUriOrig, { download: false });
        setOriginBg(imgSrc);
      }
    }
    getImage();
  }, []);

  const onChangeLogo = (e) => {
    setCurrentCropper('logo');
    onChange(e, 'logo');
  };
  const onChangeBG = (e) => {
    setCurrentCropper('bg');
    onChange(e, 'bg');
  };
  const onChange = (e, source) => {
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
      const path = cropper.getCroppedCanvas().toDataURL();
      console.log('path', path)
      if (currentCropper === 'logo') {
        setCropDataLogo(path);
        setValue('logoUri', path, { shouldValidate: true });
      } else {
        setCropDataBG(path);
        setValue('heroPhotoUri', path, {
          shouldValidate: true,
        });
      }
    }
    setCropperOpen(false);
  };

  return (
    <div>
      <FormHeader
        title="EVENT INFORMATION"
        subtitle="Let users know the basics including the reward for attending."
      />

      <Controller
        name="sponsor"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="Sponsor"
            id="sponsor"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="Title"
            id="title"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category">Category</InputLabel>
            <Select {...field} labelId="categoryLabel" id="category" label="Category">
              <MenuItem value="" />
              <MenuItem value="ART">Art</MenuItem>
              <MenuItem value="CARS_COLLECTIBLES">Cars & Collectibles</MenuItem>
              <MenuItem value="COMMERCIAL_REAL_ESTATE">Commercial Real Estate</MenuItem>
              <MenuItem value="CRYPTO">Crypto</MenuItem>
              <MenuItem value="DISTRESSED_ASSETS">Distressed Assets</MenuItem>
              <MenuItem value="MUTUAL_FUNDS">Mutual Funds</MenuItem>
              <MenuItem value="RESIDENTIAL_REAL_ESTATE">Residential Real Estate</MenuItem>
              <MenuItem value="FRANCHISE">Franchise</MenuItem>
              <MenuItem value="INSURANCE">Insurance</MenuItem>
              <MenuItem value="NFT">NFT</MenuItem>
              <MenuItem value="REAL_ESTATE">Real Estate</MenuItem>
              <MenuItem value="STOCKS">Stocks</MenuItem>
              <MenuItem value="VC">VC</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Typography variant="h5" className="mb-40 font-700">
        Upload Event Logo
      </Typography>
      <Box>
        <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item xs={12} md={3}>
            <Controller
              name="logoUri"
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
                  <Box sx={{ textAlign: 'center' }}>
                    <Icon fontSize="large" color="action">
                      camera
                    </Icon>
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
          <Grid item xs={12} md={3}>
            {(cropDataLogo || originLogo) && (
              <Container maxWidth="sm">
                <img
                  style={{ height: '120px', width: '120px' }}
                  className="rounded-12 shadow hover:shadow-lg"
                  src={cropDataLogo ?? originLogo}
                  alt="cropped"
                />
              </Container>
            )}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" className="mb-40 font-700">
        Upload Hero Image
      </Typography>
      <Box>
        <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item xs={12} md={3}>
            <Controller
              name="heroPhotoUri"
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
                  <Box sx={{ textAlign: 'center' }}>
                    <Icon fontSize="large" color="action">
                      landscape
                    </Icon>
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
          <Grid item xs={12} md={6}>
            {(cropDataBG || originBg) && (
              <Container maxWidth="sm">
                <img
                  style={{ height: '120px', width: '213px' }}
                  className="rounded-12 shadow hover:shadow-lg"
                  src={cropDataBG ?? originBg}
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

      <Controller
        name="tagline"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="Tagline"
            id="tagline"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            multiline
            rows={5}
            label="Description"
            id="description"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name="dateTime"
        control={control}
        render={({ field: { onChange, value } }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={value}
              onChange={onChange}
              renderInput={(_props) => (
                <TextField
                  label="Start Date"
                  className="mt-8 mb-16 mx-4"
                  {..._props}
                />
              )}
            />
          </LocalizationProvider>
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            id="location"
            label="Location"
            type="text"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name="reward"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.reward}
            required
            helperText={errors?.reward?.message}
            label="Reward Amount"
            id="reward"
            variant="filled"
          />
        )}
      />
    </div>
  );
}

export default EventDetailsForm;