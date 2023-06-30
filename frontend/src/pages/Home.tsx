import React, { useState, useEffect, useCallback } from 'react';
import { Pagination, Box, Container, Grid, CssBaseline, CircularProgress, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAll } from '../lib/API';
import RealityCard, { RealityCardProps } from '../components/RealityCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [data, setData] = useState<RealityCardProps[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 9;
  const defaultTheme = createTheme();

  const fetchRealityData = useCallback(async () => {
    const response = await getAll();
    setData(response);
  }, []);

  useEffect(() => {
    fetchRealityData();
  }, [fetchRealityData]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayData = data?.slice(start, end);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Container sx={{ minWidth: '400px', mt: 5, textAlign: 'center' }} maxWidth='lg'>
          <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
            {displayData && displayData.length > 0 ? (
              displayData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={`reality-card-${item.title}-${index}`}>
                  <RealityCard imageUrl={item.imageUrl} title={item.title} />
                </Grid>
              ))
            ) : (
              <>
                <CircularProgress />
                <Typography style={{ minWidth: '-webkit-fill-available' }} variant='body1'>
                  Waiting for data from scraper.
                </Typography>
              </>
            )}
          </Grid>

          {data && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <Pagination count={Math.ceil((data.length || 0) / itemsPerPage)} color='primary' page={currentPage} onChange={handleChange} />
            </Box>
          )}
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
