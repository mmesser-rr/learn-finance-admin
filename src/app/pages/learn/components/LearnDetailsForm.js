import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from '@mui/material/IconButton';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHeader from "../../../shared-components/FormHeader";
import DepositForm from "./DepositForm";
import ConfirmationDialog from '../../../shared-components/ConfirmationDialog';

function LearnDetailsForm({ bgImageUri }) {
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;
  const {
    fields: deposits,
    append,
    remove,
  } = useFieldArray({
    name: "deposits",
    control,
  });
  const [depositIndexToDelete, setDepositIndexToDelete] = useState(-1);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleAppendDeposit = () => {
    append({ videoUri: "", title: "", questions: [] });
    console.log('[LearnDetailsForm => handleAppendDeposi => deposits]: ', deposits)
  };
  const handleDeleteDeposit = () => {
    remove(depositIndexToDelete);
  };

  const [originBg, setOriginBg] = useState(bgImageUri);
  const [imageBG, setImageBG] = useState(undefined);
  const [currentCropper, setCurrentCropper] = useState("");
  const [cropDataBG, setCropDataBG] = useState();
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);

  useEffect(() => {
    async function getImage() {
      let url;
      try {
        setOriginBg((await Storage.get(bgImageUri, { download: false })) ?? "");
      } catch (err) {
        console.log("LearnDetailsForm => getImage => err => ", err);
      }
      return url;
    }
    getImage();
  }, []);

  const onChangeBG = (e) => {
    setCurrentCropper("bg");
    onChange(e, "bg");
  };
  const onChange = (e, source) => {
    if (source === "logo") {
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
      if (source === "logo") {
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
    if (typeof cropper !== "undefined") {
      const path = cropper.getCroppedCanvas().toDataURL();
      console.log("path", path);
      if (currentCropper === "logo") {
        setCropDataLogo(path);
        setValue("logoUri", path, { shouldValidate: true });
      } else {
        setCropDataBG(path);
        setValue("heroPhotoUri", path, {
          shouldValidate: true,
        });
      }
    }
    setCropperOpen(false);
  };

  return (
    <div>
      <FormHeader
        title="LEARN INFORMATION"
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
        name="level"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="level">Level</InputLabel>
            <Select {...field} labelId="levelLabel" id="level" label="Level">
              <MenuItem value="" />
              <MenuItem value="BEGINNER">Beginner</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="ADVANCED">Advanced</MenuItem>
              <MenuItem value="EXPERT">Expert</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Typography variant="h5" className="mb-40 font-700">
        Upload Hero Image
      </Typography>
      <Box>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} md={3}>
            <Controller
              name="bgImageUri"
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
                  <Box sx={{ textAlign: "center" }}>
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
                  style={{ height: "120px", width: "213px" }}
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
              style={{ height: "100%", width: "100%" }}
              zoomTo={0.2}
              initialAspectRatio={currentCropper === "logo" ? 1 : 16 / 9}
              aspectRatio={currentCropper === "logo" ? 1 : 16 / 9}
              src={currentCropper === "logo" ? imageLogo : imageBG}
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
            <Button
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

      {deposits.map((deposit, depositIndex) => (
        <div key={depositIndex}>
          <DepositForm {...{control, depositIndex}} />
          <Box>
            <IconButton
              variant="contained"
              type="button"
              // onClick={() => remove(index)}
              onClick={() => {
                setDepositIndexToDelete(depositIndex);
                setConfirmationDialogOpen(true);
              }}
              sx={{ marginTop: "16px" }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </div>
      ))}

      <Box className="my-24">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          type="button"
          onClick={() => handleAppendDeposit()}
        >
          Add Deposit
        </Button>
      </Box>
      <ConfirmationDialog
        id="deleteConfirmation"
        keepMounted
        open={confirmationDialogOpen}
        onOK={() => handleDeleteDeposit()}
        onClose={() => setConfirmationDialogOpen(false)}
      />
    </div>
  );
}

export default LearnDetailsForm;
