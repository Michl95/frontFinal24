import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (filterText?: string, page: number = 1) => {
  try {
    let url = `${BASE_URL}/character?page=${page}`;

    if (filterText) {
      url += `&name=${filterText}`;
    }
    const response = await axios.get(url);
    console.log('RESPONSE: ', response)
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
