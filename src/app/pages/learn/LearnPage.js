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
import { fetchLearnThunk } from '../store/learnSlice';

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

function LearnPage() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [bgImageUri, setBgImageUri] = useState(undefined);
  const [learn, setLearn] = useState();
  const routeParams = useParams();



  const renderLearns = () => {
    console.log('[LearnPage => renderLearns => learn]: ', learn)

    return learn && learn.deposits.map((deposit, index) => (
      <div key={index} className="ml-2">
        <p>{deposit.videoUri}</p>
        <p>{deposit.title}</p>
        {deposit && deposit.questions.map((quiz, qzIndex) => (
          <div key={qzIndex} className="ml-4">
            <p>{quiz.questionText}</p>
            <p>{quiz.correctAnswer}</p>
            {quiz && quiz.answers.map((answer, answerIndex) => (
              <div className="ml-6" key={answerIndex}>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    ))
  }

  useDeepCompareEffect(() => {
    async function load() {
      const { id } = routeParams;
      let opp;
      console.log('routeParams', routeParams)
      await dispatch(fetchLearnThunk(routeParams)).then(async (action) => {
        opp = action.payload.getLearn;
        console.log('opp', opp)
        if (opp) {
          setLearn(opp);
          // Load background & logo images
          const heroImg = await Storage.get(opp.heroPhotoUri, { download: false })
          setBgImageUri(heroImg);
        }
      });
    }
    load();
  }, [dispatch]);

  return (
    <Root
      header={<></>}
      heroImageSignedUrl={
        bgImageUri === '' ? 'assets/images/profile/morain-lake.jpg' : bgImageUri
      }
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            {/* <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <Avatar
                sx={{
                  borderWidth: 4,
                  borderStyle: 'solid',
                  borderColor: 'background.default',
                }}
                className="-mt-64  w-128 h-128"
                src={logoSignedUrl}
              />
            </motion.div> */}
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
                  {learn?.title}
                </Typography>
                {/* <Typography
                  className="md:px-16 text-8 md:text-12 font-semibold tracking-tight"
                  variant="body1"
                  color="inherit"
                >
                  {learn?.tagline}
                </Typography> */}
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
          <p className="mx-4">sponsor: {learn?.sponsor}</p>
          <p className="mx-4">level: {learn?.level}</p>
          <p className="mx-4">reward: {learn?.reward}</p>
          {renderLearns()}
        </div>
      }
    />
  );
}

export default LearnPage;
