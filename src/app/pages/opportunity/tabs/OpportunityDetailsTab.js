import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

import CountBug from '../components/CountBug';

const OpportunityDetailsTab = (props) => {
  const { opportunity } = props;
  console.log("OpportunityDetailsTab => props => ", props)
  const [showMore, setShowMore] = useState(false);
  function handleToggleShow() {
    setShowMore(!showMore);
  }
  function typeString(t) {
    if (t === 'HYBRID' || t === 'IRL') {
      if (t === 'HYBRID') {
        return 'In-Person & Online';
      }
      return 'In-Person';
    }
    return 'Online';
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {(opportunity?.eventType === 'HYBRID' || opportunity?.eventType === 'IRL') && (
            <CountBug
              icon="inperson"
              number={(opportunity?.seatsTotal - opportunity?.seatsReserved)?.toLocaleString()}
              title="In-Person"
              subtitle={`of ${opportunity?.seatsTotal.toLocaleString()} Seats Available`}
            />
          )}
          {(opportunity?.eventType === 'HYBRID' || opportunity?.eventType === 'VIRTUAL') && (
            <CountBug
              icon="online"
              number={(opportunity?.onlineTotal - opportunity?.onlineReserved)?.toLocaleString()}
              title="Online"
              subtitle={`of ${opportunity?.onlineTotal.toLocaleString()} Spots Available`}
            />
          )}
          <>
            <CountBug
              icon="reward"
              number={opportunity?.reward.toLocaleString()}
              title="Reward"
              subtitle={`${opportunity?.rewardDetails} on Completion`}
            />
          </>
        </Grid>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}>
          <Card className="mx-auto print:w-full print:shadow-none rounded-none sm:rounded-20">
            <CardContent className="p-44 print:p-0">
              <div>
                {!showMore && (
                  <>
                    <p className="text-16 -mt-4">{opportunity?.detailsTldr}</p>
                    <Button onClick={handleToggleShow}>
                      show more <Icon>add-circle</Icon>
                    </Button>
                  </>
                )}
                {showMore && (
                  <>
                    <p className="text-16 -mt-4">{opportunity?.details}</p>
                    <Button onClick={handleToggleShow}>
                      show less <Icon>remove-circle</Icon>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card className="mx-auto print:w-full print:shadow-none rounded-none sm:rounded-20">
            <CardContent className="p-44 print:p-0">
              <Grid container justifyContent="left" spacing={2} className="mb-24">
                <Grid item className="mt-16">
                  <Icon>date_range</Icon>
                </Grid>
                <Grid item>
                  <Typography className="text-10 font-300">WHEN</Typography>

                  <Typography className="text-18 font-600">
                    {moment(Math.floor(opportunity?.startDateTime)).format('dddd MMMM Do YYYY')}
                  </Typography>
                  <Typography component="div" className="text-12 font-600">
                    {moment(Math.floor(opportunity?.startDateTime)).format('h:mm A')} -{' '}
                    {moment(Math.floor(opportunity?.startDateTime)).format('h:mm A')}{' '}
                    <Typography component="div" className="text-12 font-300">
                      {opportunity?.timezone}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Grid container justifyContent="left" spacing={2} className="mb-24">
                <Grid item className="mt-16">
                  <Icon>near_me</Icon>
                </Grid>
                <Grid item>
                  <Typography className="text-10 font-300">WHERE</Typography>

                  {(opportunity?.eventType === 'HYBRID' || opportunity?.eventType === 'IRL') && (
                    <Grid item className="mt-4">
                      <Typography className="text-12 font-400">
                        {typeString(opportunity?.eventType)}
                      </Typography>

                      <Typography className="text-18 font-600">
                        {opportunity?.locationDetail?.name?.length > 0 &&
                          opportunity?.locationDetail?.name}
                        {opportunity?.locationDetail?.name?.length === 0 &&
                          opportunity?.locationDetail?.address}
                      </Typography>
                      {opportunity?.locationDetail?.name?.length > 0 && (
                        <Typography className="text-12 font-600">
                          {opportunity?.locationDetail?.address}
                        </Typography>
                      )}
                      <Typography className="text-12 font-600">
                        {opportunity?.locationDetail?.city}, {opportunity?.locationDetail?.state}{' '}
                        {opportunity?.locationDetail?.country}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid container justifyContent="left" spacing={2} className="mb-24">
                <Grid item className="mt-16">
                  <Icon>person</Icon>
                </Grid>
                <Grid item>
                  <Typography className="text-10 font-300">CREATOR</Typography>

                  <Typography
                    component={Link}
                    role="button"
                    to={`/pages/profile/${opportunity?.creatorId}`}
                    color="primary"
                    className="text-18 font-600"
                  >
                    {opportunity?.creator?.firstName} {opportunity?.creator?.lastName}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container justifyContent="left" spacing={2} className="mb-24">
                <Grid item className="mt-16">
                  <Icon>groups</Icon>
                </Grid>
                <Grid item>
                  <Typography className="text-10 font-300">ORGANIZATION</Typography>

                  <Typography
                    component={Link}
                    role="button"
                    to={`/pages/profile/${opportunity?.organizationsId}`}
                    color="primary"
                    className="text-18 font-600"
                  >
                    {opportunity?.organizationId}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="mx-auto print:w-full print:shadow-none rounded-none sm:rounded-20">
            <CardContent className="p-44 print:p-0">
              <Typography className="text-12 font-300 mb-8">Private Event?</Typography>
              <div className="mb-16">
                <Chip
                  className="mr-8"
                  variant="outlined"
                  label={opportunity?.isPrivate === true ? 'YES' : 'NO'}
                />
              </div>
              <Typography className="text-12 font-300 mb-8">Status</Typography>
              <div className="mb-16">
                <Chip className="mr-8" variant="outlined" label={opportunity?.status} />
              </div>
              <Typography className="text-12 font-300 mb-8">Categories</Typography>
              <div className="mb-16">
                {opportunity?.categories.map((t, i) => (
                  <Chip className="mr-8" variant="outlined" key={i} label={t} />
                ))}
              </div>
              <Typography className="text-12 font-300 mb-8">Tags</Typography>
              <div className="mb-16">
                {opportunity?.tags.map((t, i) => (
                  <Chip className="mr-8" variant="outlined" key={i} label={t} />
                ))}
              </div>
              <Typography className="text-12 font-300 mb-8">Links</Typography>

              <div className="mb-16">
                <Button
                  className="normal-case"
                  variant="contained"
                  color="secondary"
                  component="a"
                  href={opportunity?.registrationUrl}
                  target="_blank"
                  role="button"
                >
                  <Icon>how_to_reg</Icon>
                  <span className="mx-4">Register</span>
                </Button>
              </div>
              <div className="mb-16">
                <Button
                  className="normal-case"
                  variant="contained"
                  color="secondary"
                  component="a"
                  href={opportunity?.websiteUrl}
                  target="_blank"
                  role="button"
                >
                  <Icon>school</Icon>
                  <span className="mx-4">{opportunity?.websitePrompt}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OpportunityDetailsTab;
