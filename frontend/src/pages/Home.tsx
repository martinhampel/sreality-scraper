import React, { useState, useEffect, useCallback } from 'react';
import { Pagination, Box, Container, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAll, pingServer } from '../lib/API';
import RealityCard, { RealityCardProps } from '../components/RealityCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import WaitingBar from '../components/WaitingBar';

const Home: React.FC = () => {
  const [data, setData] = useState<RealityCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [serverReady, setServerReady] = useState<boolean>(false);

  const itemsPerPage = 9;
  const defaultTheme = createTheme();

  const checkServer = useCallback(async () => {
    const isServerReady = await pingServer();
    if (isServerReady) {
      setServerReady(true);
    } else {
      setTimeout(checkServer, 5000);
    }
  }, []);

  const fetchRealityData = useCallback(async () => {
    if (serverReady) {
      const response = await getAll();
      setData(response);
    }
  }, [serverReady]);

  useEffect(() => {
    checkServer();
  }, [checkServer]);

  useEffect(() => {
    fetchRealityData();
  }, [fetchRealityData, serverReady]);

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

        <Container sx={{ minWidth: '400px', mt: 5, textAlign: '-webkit-center' }} maxWidth='lg'>
          <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
            {serverReady ? (
              displayData && displayData.length > 0 ? (
                <>
                  {displayData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`reality-card-${item.title}-${index}`}>
                      <RealityCard imageUrl={item.imageUrl} title={item.title} />
                    </Grid>
                  ))}
                  {data && (
                    <Box sx={{ display: 'flex', justifyContent: '-webkit-center', my: 3 }}>
                      <Pagination count={Math.ceil((data.length || 0) / itemsPerPage)} color='primary' page={currentPage} onChange={handleChange} />
                    </Box>
                  )}
                </>
              ) : (
                <WaitingBar title='Waiting for data from scraper.' />
              )
            ) : (
              <WaitingBar title='Waiting for the server to start.' />
            )}
          </Grid>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
