import React, { useEffect, useState } from 'react';
import { Search } from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import { MovieType } from 'types';
import { Popup } from 'components/popup/Popup';
import { getPopular } from 'api/popular';
import { searchMovies } from 'api/search';
import './Movies.css';
import { Loader } from 'components/loader/Loader';

type StateType = {
  search: string;
  isSearching: boolean;
  movies: MovieType[];
  isPopupOpen: boolean;
  popupMovieID: number;
  totalResults: number;
  isError: boolean;
  isLoading: boolean;
};

export function Movies() {
  const [state, setState] = useState<StateType>({
    search: '',
    isSearching: false,
    movies: [],
    isPopupOpen: false,
    popupMovieID: 0,
    totalResults: 0,
    isError: false,
    isLoading: false,
  });

  useEffect(() => {
    setState((currentState: StateType) => ({ ...currentState, isError: false, isLoading: true }));
    try {
      console.log('old movies');
      getPopular({ page: 1 }).then(({ results }) => {
        setState((currentState: StateType) => ({
          ...currentState,
          movies: results,
          isLoading: false,
        }));
      });
    } catch {
      setState((currentState: StateType) => ({ ...currentState, isError: true }));
    }
  }, []);

  async function search(searchParam: string): Promise<void> {
    setState({ ...state, isError: false, isLoading: true });
    // const searchPath = generatePath('/?s=:search', { search: searchParam });
    // console.log('aaa', searchPath);
    try {
      const { results, totalResults } = await searchMovies({ page: 1, searchParam });
      console.log('movies', results);
      setState({
        ...state,
        movies: results,
        totalResults,
        isSearching: true,
        isLoading: false,
      });
    } catch {
      setState({ ...state, isError: true });
    }
  }

  return (
    <>
      {state.isLoading && <Loader />}
      <Search
        searchText={state.search}
        onChange={(text: string) => {
          setState({ ...state, search: text });
        }}
        onSearch={() => {
          search(state.search);
        }}
      />

      {state.isError && (
        <div className="search-results">Something went wrong, please try again!</div>
      )}
      {!state.movies.length && !state.isError && (
        <div className="search-results">No movies found, please try again!</div>
      )}
      <div className="movies">
        <div className="movies-wrap">
          {state.movies.map((mov) => (
            <Movie
              key={mov.id.toString()}
              movie={mov}
              onMovieClick={() => setState({ ...state, isPopupOpen: true, popupMovieID: mov.id })}
            />
          ))}
        </div>
      </div>
      {state.isPopupOpen && (
        <Popup
          movie={state.movies.find((mov) => mov.id === state.popupMovieID) || state.movies[0]}
          onClose={() => setState({ ...state, isPopupOpen: false, popupMovieID: 0 })}
        />
      )}
    </>
  );
}
