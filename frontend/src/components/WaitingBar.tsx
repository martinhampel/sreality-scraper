import { CircularProgress, Typography } from '@mui/material';

export interface WaitingBarProps {
  title: string;
}

const WaitingBar: React.FC<WaitingBarProps> = ({ title }) => {
  return (
    <>
      <CircularProgress size={30} />
      <Typography style={{ minWidth: '-webkit-fill-available' }} variant='body1'>
        {title}
      </Typography>
    </>
  );
};

export default WaitingBar;
