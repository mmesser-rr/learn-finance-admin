// import Icon from '@mui/material/Icon';
import { MdComputer, MdEmojiEvents, MdLocalActivity } from 'react-icons/md';
import { IconContext } from 'react-icons';

// export const GradientIcon = () => (
//   <>
//     <svg width="0" height="0">
//       <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
//         <stop stopColor="#6dd5ed" offset="0%" />
//         <stop stopColor="#2193b0" offset="100%" />
//       </linearGradient>
//     </svg>
//     <MdLocalActivity icon="fa-solid fa-ticket" style={{ fill: 'url(#blue-gradient)' }} />
//   </>
// );

const size = 42;
const startColor = '#6dd5ed';
const stopColor = '#2193b0';
function IconFetcher({ type }) {
  switch (type) {
    case 'inperson':
      return InPersonIcon();
    case 'online':
      return OnlineIcon();
    case 'reward':
      return RewardsIcon();
    default:
      return InPersonIcon();
  }
}

const InPersonIcon = () => (
  <>
    <svg width="0" height="0">
      <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop stopColor={startColor} offset="0%" />
        <stop stopColor={stopColor} offset="100%" />
      </linearGradient>
    </svg>
    <IconContext.Provider value={{ size }}>
      <MdLocalActivity icon="fa-solid fa-ticket" style={{ fill: 'url(#blue-gradient)' }} />
    </IconContext.Provider>
  </>
);

const OnlineIcon = () => (
  <>
    <svg width="0" height="0">
      <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop stopColor={startColor} offset="0%" />
        <stop stopColor={stopColor} offset="100%" />
      </linearGradient>
    </svg>
    <IconContext.Provider value={{ size }}>
      <MdComputer icon="fa-solid fa-ticket" style={{ fill: 'url(#blue-gradient)' }} />
    </IconContext.Provider>
  </>
);

const RewardsIcon = () => (
  <>
    <svg width="0" height="0">
      <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop stopColor={startColor} offset="0%" />
        <stop stopColor={stopColor} offset="100%" />
      </linearGradient>
    </svg>
    <IconContext.Provider value={{ size }}>
      <MdEmojiEvents icon="fa-solid fa-ticket" style={{ fill: 'url(#blue-gradient)' }} />
    </IconContext.Provider>
  </>
);

export { IconFetcher, InPersonIcon, OnlineIcon, RewardsIcon };
