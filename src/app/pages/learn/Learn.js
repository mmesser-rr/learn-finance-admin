import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import FuseLoading from '@fuse/core/FuseLoading';
import { styled } from '@mui/material/styles';
import { newLearn, fetchLearnThunk } from '../store/learnSlice';
import reducer from '../store';
import LearnHeader from './LearnHeader';
import LearnForm from './LearnForm';
import LearnDetailsForm from './components/LearnDetailsForm'

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

function Learn(props) {
  const dispatch = useDispatch();
  // const learn = useSelector(({ adminApp }) => adminApp.learn);
  const routeParams = useParams();
  const [noLearn, setNoLearn] = useState(false);
  const [data, setData] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);
  // Side Effect: Try loading the learn

  useDeepCompareEffect(() => {
    async function load() {
      // Deconstruct the id parameter from the url.
      const { id } = routeParams;
      // For new learn (create new), we do this by passing
      // "new" as the id.
      if (id === 'new') {
        // Create New Learn data
        const blankLearn = await dispatch(newLearn()).payload;

        setData(blankLearn);
      } else {
        setIsEdit(true);
        await // Get Learn data
        dispatch(fetchLearnThunk(routeParams)).then((action) => {
          // If the requested learn is not exist show message
          if (!action.payload) {
            setNoLearn(true);
          }
          const opp = action.payload.getLearn;
          if (opp) {
            setData(opp);
          }
        });
      }
    }

    load();
  }, [dispatch, routeParams]);

  // Show Message if the requested learns is not exists
  if (noLearn) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such learn!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/pages/learns"
          color="inherit"
        >
          Go to Learns Page
        </Button>
      </motion.div>
    );
  }
  if (data !== null && data !== undefined) {
    const learnForm = renderForm();
    return <LearnForm data={data} child={learnForm} />;
  }
  return <FuseLoading />;

  // Wait while learn data is loading and form is setted
  // if (
  //   data === undefined ||
  //   _.isEmpty(form) ||
  //   (learn && routeParams.id !== learn.id && routeParams.id !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  function renderForm() {
    return (
      <Root
        header={<LearnHeader />}
        content={
          <div>
            <div className="p-16 sm:p-24 max-w-2xl">
              <LearnDetailsForm bgImageUri={data?.bgImageUri} />
            </div>
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withReducer('adminApp', reducer)(Learn);
