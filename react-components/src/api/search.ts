import { MoviesData } from 'types';
import { renameValues } from './helpers';
import { API_KEY } from './key';

type SearchType = {
  page: number;
  searchParam: string;
};

const URL = 'https://api.themoviedb.org/3/search/movie';

export async function searchMovies({
  page = 1,
  searchParam = '',
}: SearchType): Promise<MoviesData> {
  const res = await fetch(
    `${URL}?api_key=${API_KEY}&language=en-US&query=${searchParam}&page=${page}&include_adult=false`
  );

  return renameValues(await res.json());
}
