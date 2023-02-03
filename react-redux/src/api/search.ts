import { MoviesData } from 'types';
import { renameValues } from './helpers';
import { API_KEY } from './key';

type SearchType = {
  page: number;
  searchParam: string;
};

const URL = 'https://api.themoviedb.org/3/search/movie';

export const searchMovies = async ({
  page = 1,
  searchParam = '',
}: SearchType): Promise<MoviesData> => {
  const res = await fetch(
    `${URL}?api_key=${API_KEY}&language=en-US&query=${searchParam}&page=${page}&include_adult=false`
  );
  if (!res.ok) {
    throw new Error('Error');
  }
  return renameValues(await res.json());
};
