import { MoviesData } from 'types';
import { renameValues } from './helpers';
import { API_KEY } from './key';

type getPopularType = {
  page: number;
};

const URL = 'https://api.themoviedb.org/3/movie/popular';

export async function getPopular({ page = 1 }: getPopularType): Promise<MoviesData> {
  const res = await fetch(`${URL}?api_key=${API_KEY}&language=en-US&page=${page}`);
  if (!res.ok) {
    throw new Error('Error');
  }
  return renameValues(await res.json());
}
