import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/?name=${query}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch characters');
  }
};

