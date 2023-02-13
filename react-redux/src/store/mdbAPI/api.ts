import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
  GetFullMovieResp,
  GetMovieResp,
  MovieTypeFull,
  MovieTypeResp,
  MovieTypeRespRenamed,
} from 'types';
import { API_KEY } from './key';

type SortType = {
  page: number;
  sortParam: string;
  itemsPerPage: number;
};

type SearchType = {
  page: number;
  searchParam: string;
  itemsPerPage: number;
};

type TSortMovieData = {
  totalResults: number;
  results: MovieTypeResp[];
  totalPages: number;
};

type TSortMovieDataRenamed = {
  totalResults: number;
  results: MovieTypeRespRenamed[];
  totalPages: number;
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

type TMovieId = {
  id: number;
};

const renameResultItems = (data: TSortMovieData): TSortMovieDataRenamed => {
  const renamedResult = data.results.map((res: MovieTypeResp) => {
    return {
      id: res.id,
      title: res.title,
      posterPath: res.poster_path,
      releaseDate: res.release_date,
      overview: res.overview,
    };
  });
  return {
    totalResults: data.totalResults,
    results: renamedResult,
    totalPages: data.totalPages,
  };
};

const renameMovieValues = (data: GetFullMovieResp) => {
  return {
    id: data.id,
    title: data.title,
    genres: data.genres,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    tagline: data.tagline,
    runtime: data.runtime,
    overview: data.overview,
    vote: data.vote_average,
  };
};

export const mdbApi = createApi({
  reducerPath: 'mdbAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: (build) => ({
    getSortMovies: build.query<TSortMovieDataRenamed, SortType>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { itemsPerPage, sortParam, page } = arg;
        const sort = sortMap[sortParam as keyof typeof sortMap];
        const baseReq = async (p: number) => {
          return fetchWithBQ(
            `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${p}&with_watch_monetization_types=flatrate`
          );
        };

        let resultItems = {
          totalResults: 0,
          results: [] as GetFullMovieResp[],
          totalPages: 0,
        };

        const count = itemsPerPage / 20;
        const apiPage = (page - 1) * count + 1;

        for (let i = 0; i < count; i++) {
          const { data, error } = await baseReq(apiPage + i);
          const interimResult = data as GetMovieResp;

          if (error) return { error: error as FetchBaseQueryError };

          const totalResults = Math.min(interimResult.total_results, 10000);
          resultItems = {
            totalResults,
            results: [...resultItems.results, ...interimResult.results],
            totalPages: Math.floor(totalResults / itemsPerPage) || 1,
          };
          if (interimResult.page === interimResult.total_pages) {
            return { data: renameResultItems(resultItems) };
          }
        }

        return { data: renameResultItems(resultItems) };
      },
    }),

    getSearchMovies: build.query<TSortMovieDataRenamed, SearchType>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { itemsPerPage, searchParam, page } = arg;

        const baseReq = async (p: number) => {
          return fetchWithBQ(
            `search/movie?api_key=${API_KEY}&language=en-US&query=${searchParam}&page=${p}&include_adult=false`
          );
        };

        let resultItems = {
          totalResults: 0,
          results: [] as GetFullMovieResp[],
          totalPages: 0,
        };

        const count = itemsPerPage / 20;
        const apiPage = (page - 1) * count + 1;

        for (let i = 0; i < count; i++) {
          const { data, error } = await baseReq(apiPage + i);
          const interimResult = data as GetMovieResp;

          if (error) return { error: error as FetchBaseQueryError };

          const totalResults = Math.min(interimResult.total_results, 10000);
          resultItems = {
            totalResults,
            results: [...resultItems.results, ...interimResult.results],
            totalPages: Math.floor(totalResults / itemsPerPage) || 1,
          };
          if (interimResult.page === interimResult.total_pages) {
            return { data: renameResultItems(resultItems) };
          }
        }

        return { data: renameResultItems(resultItems) };
      },
    }),

    getMovie: build.query<MovieTypeFull, TMovieId>({
      query: ({ id }) => ({ url: `movie/${id}?api_key=${API_KEY}&language=en-US` }),
      transformResponse: (data: GetFullMovieResp) => renameMovieValues(data),
    }),
  }),
});

export const { useGetSortMoviesQuery, useGetSearchMoviesQuery, useGetMovieQuery } = mdbApi;
