import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

export interface MovieTypeResp {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview?: string;
}

export interface MovieTypeRespRenamed {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  overview?: string;
}

export interface GetFullMovieResp {
  id: number;
  title: string;
  genres: IGenres[];
  poster_path: string;
  release_date: string;
  tagline: string;
  runtime: string;
  overview?: string;
  vote_average: number;
}

export interface MovieTypeFull {
  id: number;
  title: string;
  genres: IGenres[];
  posterPath: string;
  releaseDate: string;
  tagline: string;
  runtime: string;
  overview?: string;
  vote: number;
}

export interface GetMovieResp {
  page: number;
  results: GetFullMovieResp[];
  total_results: number;
  total_pages: number;
  error?: FetchBaseQueryError;
}

export interface MovieType {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  overview?: string;
}

export interface MoviesData {
  page: number;
  results: MovieType[];
  totalResults: number;
  totalPages: number;
}

export interface IGenres {
  id: number;
  name: string;
}

export interface CardType {
  id: number;
  url: string;
  name: string;
  date: string;
  country: string;
  isAgreeTerms: boolean;
  isAgreePromo: boolean;
}

//======================use reducer===================

export interface IMainPage {
  movies: MovieType[];
  sort: string;
  pagination: IPagination;
}

export interface ISearchPage {
  search: string;
  movies: MovieType[];
  pagination: IPagination;
}

export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
}

export interface IMoviePage {
  movieData: MovieTypeFull;
  isError: boolean;
  isLoading: boolean;
  isLoaded: boolean;
}

export interface ICardType {
  id: number;
  url: string;
  name: string;
  date: string;
  country: string;
  isAgreeTerms: boolean;
  isAgreePromo: boolean;
}

export interface IForm {
  cards: ICardType[];
  cardForm: ICardType;
  submitSuccess: boolean;
}

export interface IState {
  mainPage: IMainPage;
  searchPage: ISearchPage;
  formPage: IForm;
}

export interface IAppStateContextParam {
  state: IState;
}

export interface IAppDispatchContextParam {
  dispatch: React.Dispatch<unknown>;
}

export type TPayloadLoadData = {
  results: MovieType[];
  totalResults: number;
  totalPages: number;
};

export type TPayloadQueryParamChange = {
  sortValue: string | null;
  currentPage: number;
  itemsPerPage: number;
};

export type TPayloadSearchParamChange = {
  searchParams: string | null;
  currentPage: number;
  itemsPerPage: number;
};
