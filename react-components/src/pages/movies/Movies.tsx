// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from 'react';
import { Search } from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import { Popup } from 'components/popup/Popup';
import { getPopular } from 'api/popular';
import { searchMovies } from 'api/search';
import './Movies.css';
import { Loader } from 'components/loader/Loader';
import { AppDispatchContext, AppStateContext } from 'App';
import { MovieType } from 'types';
import {
  ERROR,
  LOADING,
  LOAD_DATA,
  LOAD_SEARCH_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  SEARCH,
} from 'constants/actions';

export function Movies() {
  const { mainPage: state } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);

  useEffect(() => {
    dispatch({ type: LOADING });

    try {
      if (state.search) {
        search(state.search);
      }
      getPopular({ page: 1 }).then(({ results }) => {
        dispatch({ type: LOAD_DATA, payload: { results } });
      });
    } catch {
      dispatch({ type: ERROR });
    }
  }, []);

  async function search(searchParam: string): Promise<void> {
    dispatch({ type: LOADING });

    try {
      const { results, totalResults } = await searchMovies({ page: 1, searchParam });
      dispatch({ type: LOAD_SEARCH_DATA, payload: { results, totalResults } });
    } catch {
      dispatch({ type: ERROR });
    }
  }

  return (
    <>
      {state.isLoading && <Loader />}
      <Search
        searchText={state.search}
        onChange={(text: string) => {
          dispatch({ type: SEARCH, payload: { search: text } });
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
          {state.movies.map((mov: MovieType) => (
            <Movie
              key={mov.id.toString()}
              movie={mov}
              onMovieClick={() => {
                dispatch({ type: POPUP_OPEN, payload: { popupMovieID: mov.id } });
              }}
            />
          ))}
        </div>
      </div>
      {state.isPopupOpen && (
        <Popup
          movie={
            state.movies.find((mov: MovieType) => mov.id === state.popupMovieID) || state.movies[0]
          }
          onClose={() => {
            dispatch({ type: POPUP_CLOSE });
          }}
        />
      )}
    </>
  );
}
