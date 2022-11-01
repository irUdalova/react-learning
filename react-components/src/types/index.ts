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

export interface MovieTypes {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview?: string;
}

// export interface MoviePopupTypes extends MovieTypes {
//   overview: string;
// }

export interface ICard {
  id: number;
  url: string;
  name: string;
  date: string;
  country: string;
  isAgreeTerms: boolean;
  isAgreePromo: boolean;
}
