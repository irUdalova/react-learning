// export type StateType = {
//   search: string;
// };

// export type PropsType = Record<string, unknown>;

// export type PropsValues = {
//   searchText: string;
//   onChange: (text: string) => void;
// };

export interface ProductTypes {
  id: number;
  img: string;
  name: string;
  bestfor: string;
  producer: string;
  type: string;
  amount: number;
  price: number;
  isPopular: boolean;
}
