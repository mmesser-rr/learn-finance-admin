import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconFetcher } from '../../../../shared-components/GradientIcon';

function CountBug({ icon, number, title, subtitle }) {
  return (
    <Grid item xs={12} sm={12} md={4} lg={4} className="mb-24">
      <Card className="px-24 py-32">
        <Grid container alignItems="center" justifyContent="left">
          <Grid item className="mr-10">
            <IconFetcher type={icon} />
          </Grid>
          <Grid item>
            <Typography component="div" className="text-36 font-600 tracking-tighter">
              <Typography className="text-12 font-300 tracking-tighter -mb-10">{title}</Typography>
              {number}{' '}
              <Typography className="text-12 font-300 tracking-tighter -mt-5">
                {subtitle}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default CountBug;
