import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { resetOpportunity, newOpportunity, fetchOpportunity } from '../store/opportunitySlice';
import reducer from '../store';
import OpportunityHeader from './OpportunityHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import OpportunityImagesTab from './tabs/OpportunityImagesTab';
import WhenWhereTab from './tabs/WhenWhereTab';

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

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup
    .string()
    .required('You must enter an opportunity title')
    .min(5, 'The opportunity title must be at least 5 characters'),
});

function Opportunity(props) {
  const dispatch = useDispatch();
  const opportunity = useSelector(({ adminApp }) => adminApp.opportunity);

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noOpportunity, setNoOpportunity] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Basic Info
      eventType: 'real_estate',
      status: '',
      isPrivate: false,
      title: '',
      subtitle: '',
      description: '',
      descriptionTldr: '',
      categories: [],
      tags: [],
      // When And Where
      inPerson: false,
      seatsTotal: 0,
      websiteUrl: '',
      websitePrompt: '',
      startDateTime: Date.now(),
      endDateTime: Date.now(),
    },
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateOpportunityState() {
      const { opportunityId } = routeParams;
      console.log('Opportunity => useDeepCompareEffect => opportunityId => ', opportunityId);
      if (opportunityId === 'new') {
        /**
         * Create New Opportunity data
         */
        dispatch(newOpportunity());
      } else {
        /**
         * Get Opportunity data
         */
        dispatch(fetchOpportunity(routeParams)).then((action) => {
          /**
           * If the requested opportunity is not exist show message
           */
          if (!action.payload) {
            setNoOpportunity(true);
          }
        });
      }
    }

    updateOpportunityState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!opportunity) {
      return;
    }
    /**
     * Reset the form on opportunity state changes
     */
    reset(opportunity);
  }, [opportunity, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Opportunity on component unload
       */
      dispatch(resetOpportunity());

      setNoOpportunity(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested opportunities is not exists
   */
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

  /**
   * Wait while opportunity data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (opportunity &&
      routeParams.opportunityId !== opportunity.id &&
      routeParams.opportunityId !== 'new')
  ) {
    // return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
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
          <div className="p-16 sm:p-24 max-w-2xl">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <BasicInfoTab />
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <OpportunityImagesTab />
            </div>

            <div className={tabValue !== 2 ? 'hidden' : ''}>
              <WhenWhereTab />
            </div>
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default withReducer('adminApp', reducer)(Opportunity);
