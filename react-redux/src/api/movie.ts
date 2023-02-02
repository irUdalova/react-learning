import { MovieTypeFull } from 'types';
import { renameMovieValues } from './helpers';
import { API_KEY } from './key';

type TGetMovie = {
  id: number;
};

const URL = 'https://api.themoviedb.org/3/movie/';

export async function getMovie({ id }: TGetMovie): Promise<MovieTypeFull> {
  const res = await fetch(`${URL}${id}?api_key=${API_KEY}&language=en-US`);

  return renameMovieValues(await res.json());
}
