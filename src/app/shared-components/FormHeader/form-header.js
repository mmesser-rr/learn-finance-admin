import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const FormHeader = (props) => {
  const { title, subtitle } = props;
  const theme = useTheme();
  const color = theme.palette.text.primary; // contrastTheme.palette.text.secondary;
  return (
    <>
      <Typography sx={{ color }} className="text-36 mt-16 font-900" component="h2">
        {title}
      </Typography>
      <Typography sx={{ color }} className="text-12 -mt-4 mb-36">
        {subtitle}
      </Typography>
    </>
  );
};

export default FormHeader;
