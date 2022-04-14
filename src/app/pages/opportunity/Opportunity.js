import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import FuseLoading from '@fuse/core/FuseLoading';
import { styled } from '@mui/material/styles';
import { newOpportunity, fetchOpportunity } from '../store/opportunitySlice';
import reducer from '../store';
import OpportunityHeader from './OpportunityHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import OpportunityImagesTab from './tabs/OpportunityImagesTab';
import WhenWhereTab from './tabs/WhenWhereTab';
import OpportunityForm from './OpportunityForm';

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

function Opportunity(props) {
  const dispatch = useDispatch();
  const opportunity = useSelector(({ adminApp }) => adminApp.opportunity);
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noOpportunity, setNoOpportunity] = useState(false);
  const [formOpportunity, setFormOpportunity] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);
  // Side Effect: Try loading the opportunity
  // useEffect(() => {
  useDeepCompareEffect(() => {
    function updateOpportunityState() {
      // Deconstruct the id parameter from the url.
      const { id } = routeParams;
      // For new opportunity (create new), we do this by passing
      // "new" as the id.
      if (id === 'new') {
        // Create New Opportunity data
        const blankOpportunity = dispatch(newOpportunity()).payload;

        setFormOpportunity(blankOpportunity);
      } else {
        setIsEdit(true);
        // Get Opportunity data
        dispatch(fetchOpportunity(routeParams)).then((action) => {
          // If the requested opportunity is not exist show message
          if (!action.payload) {
            setNoOpportunity(true);
          }
          const opp = action.payload.getOpportunity;
          if (opp) {
            setFormOpportunity(opp);
          }
        });
      }
    }

    updateOpportunityState();
    // }, [dispatch, routeParams]);
  }, [dispatch, routeParams]);

  // useEffect(() => {
  //   if (!opportunity) {
  //     return;
  //   }
  //   // Reset the form on opportunity state changes
  //   reset(opportunity);
  // }, [opportunity, reset]);

  // useEffect(() => {
  //   return () => {
  //     // Reset Opportunity on component unload
  //     dispatch(resetOpportunity());

  //     setNoOpportunity(false);
  //   };
  // }, [dispatch]);

  // Tab Change
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  // Show Message if the requested opportunities is not exists
  if (noOpportunity) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such opportunity!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/pages/opportunities"
          color="inherit"
        >
          Go to Opportunities Page
        </Button>
      </motion.div>
    );
  }
  const opportunityForm = renderForm();
  if (formOpportunity !== null && formOpportunity !== undefined) {
    return <OpportunityForm data={formOpportunity} child={opportunityForm} />;
  }
  return <FuseLoading />;

  // Wait while opportunity data is loading and form is setted
  // if (
  //   formOpportunity === undefined ||
  //   _.isEmpty(form) ||
  //   (opportunity && routeParams.id !== opportunity.id && routeParams.id !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  function renderForm() {
    return (
      <Root
        header={<OpportunityHeader />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64" label="Basic Info" />
            <Tab className="h-64" label="Opportunity Images" />
            <Tab className="h-64" label="When & Where" />
          </Tabs>
        }
        content={
          <div>
            <div className="p-16 sm:p-24 max-w-2xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab showStatus={isEdit} />
              </div>

              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <OpportunityImagesTab />
              </div>

              <div className={tabValue !== 2 ? 'hidden' : ''}>
                <WhenWhereTab />
              </div>
            </div>
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withReducer('adminApp', reducer)(Opportunity);
