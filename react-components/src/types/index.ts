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
};

export type TActionMainReducer = {
  type: string;
  payload: TPayload;
};
