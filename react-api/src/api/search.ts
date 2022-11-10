import { MovieResponse } from 'types';
import { API_KEY } from './key';

type SearchType = {
  // api_key: string;
  page: number;
  searchParam: string;
};

const URL = 'https://api.themoviedb.org/3/search/movie';

export async function searchMovies({
  // api_key = API_KEY,
  page = 1,
  searchParam = '',
}: SearchType): Promise<MovieResponse> {
  const res = await fetch(
    `${URL}?api_key=${API_KEY}&language=en-US&query=${searchParam}&page=${page}&include_adult=false`
  );
  return await res.json();
}
