import { Typography } from '@mui/material';

const FormHeader = (props) => {
  const { title, subtitle } = props;
  return (
    <>
      <Typography className="text-36 mt-16 font-700" component="h2">
        {title}
      </Typography>
      <Typography className="text-12 -mt-4 mb-36">{subtitle}</Typography>
    </>
  );
};

export default FormHeader;
