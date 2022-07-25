import { Storage } from "aws-amplify"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useDeepCompareEffect } from '@fuse/hooks';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useParams } from 'react-router-dom';
// // Components
import { fetchRewardThunk } from '../store/rewardSlice';

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

function RewardPage() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [logoSignedUrl, setLogoSignedUrl] = useState(undefined);
  const [heroImageSignedUrl, setHeroImageSignedUrl] = useState(undefined);
  const [reward, setReward] = useState(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    async function load() {
      const { id } = routeParams;
      let opp;
      console.log('routeParams', routeParams)
      await dispatch(fetchRewardThunk(routeParams)).then(async (action) => {
        opp = action.payload.getReward;
        console.log('opp', opp)
        if (opp) {
          setReward(opp);
          // Load background & logo images
          const logoImg = await Storage.get(opp.logoUri, { download: false })
          const heroImg = await Storage.get(opp.heroPhotoUri, { download: false })
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
                  {reward?.title}
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
        </>
      }
      content={
        <div className="p-16 sm:p-24">
          <p className="mx-4">wealthAmount: {reward?.wealthAmount}</p>
          <p className="mx-4">description: {reward?.description}</p>
        </div>
      }
    />
  );
}

export default RewardPage;
