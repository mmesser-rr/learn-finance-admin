import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
// Components
import DetailsForm from "./tabs/DetailsForm";
import AboutTab from "./tabs/AboutTab";
import PhotosVideosTab from "./tabs/PhotosVideosTab";
import TimelineTab from "./tabs/TimelineTab";
import AvatarEdit from "../../shared-components/AvatarEdit";
import HeroEdit from "../../shared-components/HeroEdit";
import { getPhoto, getProfile, savePhoto } from "../store/profileSlice";

// Form validation schema
const schema = yup.object().shape({
  avatarEdit: yup
    .mixed()
    .required("Please select a file")
    .test(
      "fileSize",
      "The file is too large - must be less than 25mb",
      (value) => {
        return value && value[0].size <= 25000000;
      }
    )
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value.length &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    }),
});

const Root = styled(FusePageSimple)(({ theme, user }) => ({
  "& .FusePageSimple-topBg2": {
    // background: 'url("assets/images/profile/morain-lake.jpg")!important',
    // background: `url("${user?.data?.heroPhotoUri}")!important`,
    // backgroundSize: 'cover!important',
    // backgroundPosition: 'center center!important',
  },

  "& .FusePageSimple-header": {
    background: "none",
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down("lg")]: {
      height: 240,
      minHeight: 240,
    },
  },

  "& .FusePageSimple-wrapper": {
    background: "transparent",
  },

  "& .FusePageSimple-content": {
    width: "100%",
    maxWidth: 1120,
    margin: "auto",
  },

  "& .FusePageSimple-toolbar": {
    width: "100%",
    maxWidth: 1120,
    margin: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minHeight: "auto",
    height: "auto",
    aliginItesm: "flex-start",
  },
}));

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { control, formState, handleSubmit, register } = methods;
  const { errors } = formState;
  const [selectedTab, setSelectedTab] = useState(0);
  const [cropper, setCropper] = useState();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(undefined);
  const [activeUser, setActiveUser] = useState(user);
  const [profileImageSignedUrl, setProfileImageSignedUrl] = useState("");
  const [heroImageSignedUrl, setHeroImageSignedUrl] = useState("");

  useDeepCompareEffect(() => {
    async function load() {
      console.log("[ProfilePage => load => user]: ", user)
      await dispatch(getProfile({ id: user.id })).then((action) => {
        console.log('[ProfilePage => action.payload.getAthlete] => ', action.payload.getAthlete)
        setActiveUser({ data: action.payload.getAthlete });
      });
      await dispatch(getPhoto(user.data.profilePhotoUri)).then((action) => {
        setProfileImageSignedUrl(action.payload);
      });
      await dispatch(getPhoto(user.data.heroPhotoUri)).then((action) => {
        setHeroImageSignedUrl(action.payload);
      });
    }
    load();
  }, [user, dispatch]);
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  const handleSaveProfileImage = async (data) => {
    await dispatch(
      savePhoto({ userId: user.id, type: "profile", image: data })
    );
  };
  const handleSaveHeroImage = async (data) => {
    await dispatch(savePhoto({ userId: user.id, type: "hero", image: data }));
  };

  return (
    <Root
      header={
        <FormProvider {...methods}>
          <HeroEdit
            register={register}
            src={heroImageSignedUrl}
            handleSubmit={handleSaveHeroImage}
          />
        </FormProvider>
      }
      user={activeUser}
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.1 } }}
            >
              <FormProvider {...methods}>
                <AvatarEdit
                  register={register}
                  src={profileImageSignedUrl} // src={activeUser?.data?.profilePhotoUri} // "assets/images/avatars/Velazquez.jpg"
                  className="-mt-64  w-128 h-128 rounded-full flex justify-center"
                  handleSubmit={handleSaveProfileImage}
                />
              </FormProvider>
            </motion.div>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <Typography
                  className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
                  variant="h4"
                  color="inherit"
                >
                  {activeUser?.data?.firstName} {activeUser?.data?.lastName}
                </Typography>
                <Typography
                  className="md:px-16 text-8 md:text-12 font-semibold tracking-tight"
                  variant="body1"
                  color="inherit"
                >
                  @{activeUser?.data?.handle}
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                <Button
                  className="mx-8"
                  variant="contained"
                  color="secondary"
                  aria-label="Follow"
                >
                  Follow
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Send Message"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="w-full px-24 -mx-4 min-h-40"
            classes={{
              indicator: "flex justify-center bg-transparent w-full h-full",
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: "text.disabled" }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Details"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Organization"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Photos & Videos"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Timeline"
            />
          </Tabs>
        </>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <DetailsForm />}
          {selectedTab === 1 && <AboutTab />}
          {selectedTab === 2 && <PhotosVideosTab />}
          {selectedTab === 3 && <TimelineTab />}
        </div>
      }
    />
  );
}

export default ProfilePage;
