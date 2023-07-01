const BASE_URL: string = 'http://localhost:3003';

const getAll = async () => {
  try {
    const response = await fetch(BASE_URL + '/values/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const pingServer = async () => {
  try {
    const response = await fetch(BASE_URL + '/ping');
    return response.ok;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
};

export { getAll, pingServer };
