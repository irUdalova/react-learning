export interface MovieTypeResp {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview?: string;
}

export interface GetMovieResp {
  page: number;
  results: MovieTypeResp[];
  total_results: number;
  total_pages: number;
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

export interface IMovie {
  search: string;
  movies: MovieType[];
  isPopupOpen: boolean;
  popupMovieID: number;
  totalResults: number;
  isError: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  sort: string;
  pagination: IPagination;
}

export interface ISearch {
  search: string;
  movies: MovieType[];
  isPopupOpen: boolean;
  popupMovieID: number;
  totalResults: number;
  isError: boolean;
  isLoading: boolean;
  isLoaded: boolean;
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
  mainPage: IMovie;
  searchPage: ISearch;
  formPage: IForm;
}

export interface IAppStateContextParam {
  state: IState;
}

export interface IAppDispatchContextParam {
  dispatch: React.Dispatch<unknown>;
}

export type TPayload = {
  results: IMovie[];
  totalResults: number;
  totalPages: number;
  searchParams: string;
  popupMovieID: number;
  formData: ICardType;
  url: string;
  date: string;
  name: string;
  country: string;
  isAgreeTerms: boolean;
  isAgreePromo: boolean;
  sortValue: string;
  currentPage: number;
  itemsPerPage: number;
  movie: MovieTypeFull;
};

export type TActionMainReducer = {
  type: string;
  payload: TPayload;
};
