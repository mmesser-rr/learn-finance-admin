import { Storage } from "aws-amplify"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useDeepCompareEffect } from '@fuse/hooks';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useParams } from 'react-router-dom';
// // Components
import { fetchOpportunity } from '../store/opportunitySlice';
import OpportunityDetailsTab from './tabs/OpportunityDetailsTab';

const Root = styled(FusePageSimple)(({ theme, heroImageSignedUrl }) => ({
  '& .FusePageSimple-topBg': {
    background: `url(${heroImageSignedUrl})!important`,
    backgroundSize: 'cover!important',
    backgroundPosition: 'center center!important',
  },

  '& .FusePageSimple-header': {
    background: 'none',
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('lg')]: {
      height: 240,
      minHeight: 240,
    },
  },

  '& .FusePageSimple-wrapper': {
    background: 'transparent',
  },

  '& .FusePageSimple-content': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
  },

  '& .FusePageSimple-toolbar': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'auto',
    height: 'auto',
    aliginItesm: 'flex-start',
  },
}));

function OpportunityPage() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [selectedTab, setSelectedTab] = useState(0);
  const [logoSignedUrl, setLogoSignedUrl] = useState(undefined);
  const [heroImageSignedUrl, setHeroImageSignedUrl] = useState(undefined);
  const [opportunity, setOpportunity] = useState(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    async function load() {
      const { id } = routeParams;
      let opp;
      console.log('routeParams', routeParams)
      await dispatch(fetchOpportunity(routeParams)).then(async (action) => {
        opp = action.payload.getOpportunity;
        console.log('opp', opp)
        if (opp) {
          setOpportunity(opp);
          // Load background & logo images
          console.log('opportunityPage => opp => ', opp.heroPhotoUri);
          const logoImgUri = `opportunities/${opp.id}/logo.jpg`
          const heroImgUri = `opportunities/${opp.id}/heroPhoto.jpg`
          const logoImg = await Storage.get(logoImgUri, { download: false })
          const heroImg = await Storage.get(heroImgUri, { download: false })
          console.log("logoImg", logoImg)
          console.log("heroImg", heroImg)
          setLogoSignedUrl(logoImg);
          setHeroImageSignedUrl(heroImg);
        }
      });
      // await dispatch(getPhoto(opp.heroPhotoUri)).then((action) => {
      //   setHeroImageSignedUrl(action.payload);
      // });
      // await dispatch(getPhoto(opp.logoUri)).then((action) => {
      //   setLogoSignedUrl(action.payload);
      // });
    }
    load();
  }, [dispatch]);
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  return (
    <Root
      header={<></>}
      heroImageSignedUrl={
        heroImageSignedUrl === '' ? 'assets/images/profile/morain-lake.jpg' : heroImageSignedUrl
      }
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <Avatar
                sx={{
                  borderWidth: 4,
                  borderStyle: 'solid',
                  borderColor: 'background.default',
                }}
                className="-mt-64  w-128 h-128"
                src={logoSignedUrl}
              />
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
                  {opportunity?.title}
                </Typography>
                <Typography
                  className="md:px-16 text-8 md:text-12 font-semibold tracking-tight"
                  variant="body1"
                  color="inherit"
                >
                  {opportunity?.subtitle}
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                <Button className="mx-8" variant="contained" color="secondary" aria-label="Follow">
                  Follow
                </Button>
                <Button variant="contained" color="primary" aria-label="Send Message">
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
            classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
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
              label="Attendees"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Photos & Videos"
            />
          </Tabs>
        </>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <OpportunityDetailsTab opportunity={opportunity} />}
          {/* {selectedTab === 1 && <AboutTab />}
          {selectedTab === 2 && <PhotosVideosTab />} */}
        </div>
      }
    />
  );
}

export default OpportunityPage;
