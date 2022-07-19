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
import { newEvent, fetchEventThunk } from '../store/eventSlice';
import reducer from '../store';
import EventHeader from './EventHeader';
import EventForm from './EventForm';
import EventDetailsForm from './components/EventDetailsForm'

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

function Event(props) {
  const dispatch = useDispatch();
  // const event = useSelector(({ adminApp }) => adminApp.event);
  const routeParams = useParams();
  const [noEvent, setNoEvent] = useState(false);
  const [data, setData] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);
  // Side Effect: Try loading the event

  useDeepCompareEffect(() => {
    async function load() {
      // Deconstruct the id parameter from the url.
      const { id } = routeParams;
      // For new event (create new), we do this by passing
      // "new" as the id.
      if (id === 'new') {
        // Create New Event data
        const blankEvent = await dispatch(newEvent()).payload;

        setData(blankEvent);
      } else {
        setIsEdit(true);
        await // Get Event data
        dispatch(fetchEventThunk(routeParams)).then((action) => {
          // If the requested event is not exist show message
          if (!action.payload) {
            setNoEvent(true);
          }
          const opp = action.payload.getEvent;
          if (opp) {
            setData(opp);
          }
        });
      }
    }

    load();
  }, [dispatch, routeParams]);

  // Tab Change
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  // Show Message if the requested events is not exists
  if (noEvent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such event!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/pages/events"
          color="inherit"
        >
          Go to Events Page
        </Button>
      </motion.div>
    );
  }
  const eventForm = renderForm();
  if (data !== null && data !== undefined) {
    return <EventForm data={data} child={eventForm} />;
  }
  return <FuseLoading />;

  // Wait while event data is loading and form is setted
  // if (
  //   data === undefined ||
  //   _.isEmpty(form) ||
  //   (event && routeParams.id !== event.id && routeParams.id !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  function renderForm() {
    return (
      <Root
        header={<EventHeader />}
        content={
          <div>
            <div className="p-16 sm:p-24 max-w-2xl">
              <EventDetailsForm logoUriOrig={data?.logoUri} heroPhotoUriOrig={data?.heroPhotoUri} />
            </div>
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withReducer('adminApp', reducer)(Event);
