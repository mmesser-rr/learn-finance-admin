import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Storage } from "aws-amplify";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "../../../@fuse/core/FuseLoading";
import { theme } from "@fuse/default-settings";

const AvatarEdit = (props) => {
  const { register, src, className, handleSubmit } = props;
  const dispatch = useDispatch();
  const { onChange, ...params } = register("avatarEdit");
  const methods = useFormContext();
  const { formState, trigger } = methods;
  const { errors } = formState;
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentCropper, setCurrentCropper] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function getImage() {
      const imgSrc = await Storage.get(src, { download: false });
      console.log(`avatarEdit => ${imgSrc}`);
      setImageUrl(imgSrc);
    }
    getImage();
  }, [src]);

  const setSelectedImage = async (orig: any) => {
    setImage(undefined);
    setCropper(undefined);
    // e.preventDefault();

    setCropperOpen(true);

    const resized = await resizeFile(orig);

    const reader = new FileReader();

    setImage(resized);
  };

  const getCropData = () => {
    // dispatch(closeDialog());
    setImage(undefined);
    if (typeof cropper !== "undefined") {
      const data = cropper.getCroppedCanvas().toDataURL();
      setCropData(data);
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
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        600,
        600
      );
    });

  return (
    <>
      <div
        style={{
          borderWidth: 5,
          borderStyle: "solid",
          borderColor: theme.colors.background.paper,
          backgroundColor: theme.colors.background.paper,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
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
              const result = await trigger("avatarEdit");

              if (result === true) {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              } else {
                dispatch(
                  showMessage({
                    message: "The image must be less than 25Mb.", // text or html
                    autoHideDuration: 3000, // ms
                    anchorOrigin: {
                      vertical: "bottom", // top bottom
                      horizontal: "left", // left center right
                    },
                    variant: "error", // success error info warning null
                  })
                );
              }
            }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="div"
            className="mt-80"
          >
            <PhotoCamera style={{ color: "#ffffff", height: 36, width: 36 }} />
          </IconButton>
        </label>
      </div>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Dialog open={cropperOpen}>
          <DialogContent>
            {image && (
              <Cropper
                style={{ height: "100%", width: "100%" }}
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

AvatarEdit.propTypes = {
  register: PropTypes.func,
  src: PropTypes.string,
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default AvatarEdit;
