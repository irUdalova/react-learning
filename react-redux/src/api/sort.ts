import { MoviesData } from 'types';
import { renameValues } from './helpers';
import { API_KEY } from './key';

type SortType = {
  page: number;
  sortParam: string;
};

const sortMap = {
  PopularityDesc: 'popularity.desc',
  PopularityAsc: 'popularity.asc',
  RatingDesc: 'vote_count.desc',
  RatingAsc: 'vote_count.asc',
  ReleaseDesc: 'release_date.desc',
  ReleaseAsc: 'release_date.asc',
  TitleAZ: 'original_title.asc',
  TitleZA: 'original_title.desc',
};

const URL = 'https://api.themoviedb.org/3/discover/movie';

export const sortMovies = async ({
  page = 1,
  sortParam = 'PopularityDesc',
}: SortType): Promise<MoviesData> => {
  const res = await fetch(
    `${URL}?api_key=${API_KEY}&language=en-US&sort_by=${
      sortMap[sortParam as keyof typeof sortMap]
    }&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
  );
  if (!res.ok) {
    throw new Error('Error');
  }
  return renameValues(await res.json());
};
