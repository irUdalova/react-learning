import { GetMovieResp, MovieType, MovieTypeResp } from 'types';
import { searchMovies } from './search';
import { sortMovies } from './sort';

type TItemsAmountSort = {
  itemsPerPage: number;
  sortParam: string;
  page: number;
};

type TItemsAmountSearch = {
  itemsPerPage: number;
  searchParam: string;
  page: number;
};

export function renameValues(response: GetMovieResp) {
  const results = response.results.map((res: MovieTypeResp) => {
    return {
      id: res.id,
      title: res.title,
      posterPath: res.poster_path,
      releaseDate: res.release_date,
      overview: res.overview,
    };
  });

  return {
    page: response.page,
    results,
    totalResults: response.total_results,
    totalPages: response.total_pages,
  };
}

export const getItemsAmountSort = async ({ itemsPerPage, sortParam, page }: TItemsAmountSort) => {
  let resultItems = {
    totalResults: 0,
    results: [] as MovieType[],
    totalPages: 0,
  };

  const count = itemsPerPage / 20;
  const apiPage = (page - 1) * count + 1;

  for (let i = 0; i < count; i++) {
    const interimResult = await sortMovies({ sortParam, page: apiPage + i });
    const totalResults = Math.min(interimResult.totalResults, 10000);
    resultItems = {
      totalResults,
      results: [...resultItems.results, ...interimResult.results],
      totalPages: Math.floor(totalResults / itemsPerPage) || 1,
    };
    if (interimResult.page === interimResult.totalPages) {
      return resultItems;
    }
  }

  return resultItems;
};

export const getItemsAmountSearch = async ({
  itemsPerPage,
  searchParam,
  page,
}: TItemsAmountSearch) => {
  let resultItems = {
    totalResults: 0,
    results: [] as MovieType[],
    totalPages: 0,
  };

  const count = itemsPerPage / 20;
  const apiPage = (page - 1) * count + 1;

  for (let i = 0; i < count; i++) {
    const interimResult = await searchMovies({ searchParam, page: apiPage + i });
    const totalResults = Math.min(interimResult.totalResults, 10000);
    resultItems = {
      totalResults: interimResult.totalResults,
      results: [...resultItems.results, ...interimResult.results],
      totalPages: Math.floor(totalResults / itemsPerPage) || 1,
    };
    if (interimResult.page === interimResult.totalPages) {
      return resultItems;
    }
  }

  return resultItems;
};
