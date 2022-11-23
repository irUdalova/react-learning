// export type StateType = {
//   search: string;
// };

// export type PropsType = Record<string, unknown>;

// export type PropsValues = {
//   searchText: string;
//   onChange: (text: string) => void;
// };

// export interface MovieTypes {
//   id: number;
//   img: string;
//   name: string;
//   bestfor: string;
//   producer: string;
//   type: string;
//   amount: number;
//   price: number;
//   isPopular: boolean;
// }

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
