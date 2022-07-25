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
import { newReward, fetchRewardThunk } from '../store/rewardSlice';
import reducer from '../store';
import RewardHeader from './RewardHeader';
import RewardForm from './RewardForm';
import RewardDetailsForm from './components/RewardDetailsForm'

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

function Reward(props) {
  const dispatch = useDispatch();
  // const reward = useSelector(({ adminApp }) => adminApp.reward);
  const routeParams = useParams();
  const [noReward, setNoReward] = useState(false);
  const [data, setData] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);
  // Side Effect: Try loading the reward

  useDeepCompareEffect(() => {
    async function load() {
      // Deconstruct the id parameter from the url.
      const { id } = routeParams;
      // For new reward (create new), we do this by passing
      // "new" as the id.
      if (id === 'new') {
        // Create New Reward data
        const blankReward = await dispatch(newReward()).payload;

        setData(blankReward);
      } else {
        setIsEdit(true);
        await // Get Reward data
        dispatch(fetchRewardThunk(routeParams)).then((action) => {
          // If the requested reward is not exist show message
          if (!action.payload) {
            setNoReward(true);
          }
          const opp = action.payload.getReward;
          if (opp) {
            setData(opp);
          }
        });
      }
    }

    load();
  }, [dispatch, routeParams]);

  // Tab Change
  function handleTabChange(reward, value) {
    setTabValue(value);
  }

  // Show Message if the requested rewards is not exists
  if (noReward) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such reward!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/pages/rewards"
          color="inherit"
        >
          Go to Rewards Page
        </Button>
      </motion.div>
    );
  }
  const rewardForm = renderForm();
  if (data !== null && data !== undefined) {
    return <RewardForm data={data} child={rewardForm} />;
  }
  return <FuseLoading />;

  // Wait while reward data is loading and form is setted
  // if (
  //   data === undefined ||
  //   _.isEmpty(form) ||
  //   (reward && routeParams.id !== reward.id && routeParams.id !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  function renderForm() {
    return (
      <Root
        header={<RewardHeader />}
        content={
          <div>
            <div className="p-16 sm:p-24 max-w-2xl">
              <RewardDetailsForm logoUriOrig={data?.logoUri} heroPhotoUriOrig={data?.heroPhotoUri} />
            </div>
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withReducer('adminApp', reducer)(Reward);
