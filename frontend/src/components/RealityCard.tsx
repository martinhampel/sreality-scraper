import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export interface RealityCardProps {
  imageUrl: string;
  title: string;
}

const RealityCard: React.FC<RealityCardProps> = ({ imageUrl, title }) => {
  return (
    <Card sx={{ maxWidth: 345, ':hover': { boxShadow: 5 } }} variant='outlined'>
      <CardMedia sx={{ height: 140 }} image={imageUrl} />
      <CardContent>
        <Typography>{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default RealityCard;
