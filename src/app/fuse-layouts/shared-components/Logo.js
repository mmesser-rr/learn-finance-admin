import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <img
        className="logo-icon"
        style={{ height: 26 }}
        src="assets/images/logos/bankdaologo.svg"
        alt="logo"
      />
    </Root>
  );
}

export default Logo;
