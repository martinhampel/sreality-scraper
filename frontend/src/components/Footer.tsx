import React, { FC } from 'react';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Copyright: FC = () => {
  return (
    <Typography variant='body2' color='text.secondary'>
      {`Copyright © Martin Hampel ${new Date().getFullYear()}`}
    </Typography>
  );
};

const Footer: FC = () => {
  const backgroundColor: (theme: Theme) => string = (theme: Theme) => theme.palette.grey[200];

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 3,
        mt: 'auto',
        backgroundColor,
        textAlign: 'center',
      }}>
      <Container maxWidth='sm'>
        <Typography variant='body1'>
          Data from{' '}
          <Link color='inherit' href='https://www.sreality.cz/'>
            sreality.cz
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
