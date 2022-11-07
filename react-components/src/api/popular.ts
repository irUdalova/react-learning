import { MovieResponse } from 'types';
import { API_KEY } from './key';

type getPopularType = {
  // api_key: string;
  page: number;
};

const URL = 'https://api.themoviedb.org/3/movie/popular';

export async function getPopular({
  // api_key = API_KEY,
  page = 1,
}: getPopularType): Promise<MovieResponse> {
  const res = await fetch(`${URL}?api_key=${API_KEY}&language=en-US&page=${page}`);
  return await res.json();
}
