import axios from 'axios';

axios.defaults.baseURL = '';

const setParams = ({ q, page }) =>
  (axios.defaults.params = {
    q,
    page,
    key: '25305130-ef29c62bc45079bdaa4fbef3c',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

export const getImage = async (q = 'cat', page = 1) => {
  setParams({ q, page });
  try {
    const res = await axios.get('https://pixabay.com/api/');
    if (!res.data.hits.length) {
      throw new Error('Not found');
    }
    return res.data.hits;
  } catch (err) {
    throw err;
  }
};
