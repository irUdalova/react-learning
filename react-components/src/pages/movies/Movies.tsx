// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Sort } from 'components/sort/Sort';
import { Movie } from 'components/movie/Movie';
import { Popup } from 'components/popup/Popup';
import { getPopular } from 'api/popular';
import './Movies.css';
import { Loader } from 'components/loader/Loader';
import { AppDispatchContext, AppStateContext } from 'App';
import { MovieType } from 'types';
import {
  ERROR,
  LOADED,
  LOADING,
  LOAD_DATA,
  LOAD_SORT_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  SEARCH,
  SORT,
} from 'constants/actions';
import { sortMovies } from 'api/sort';

export function Movies() {
  const { mainPage: state } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.sort) {
      dispatch({ type: LOADING });

      sortMovies({ page: 1, sortParam: state.sort })
        .then(({ results, totalResults }) => {
          dispatch({
            type: LOAD_SORT_DATA,
            payload: { results, totalResults, sortValue: state.sort },
          });
        })
        .catch(() => {
          dispatch({ type: ERROR });
        })
        .finally(() => {
          dispatch({ type: LOADED });
        });
    }
    if (!state.isLoaded) {
      getPopular({ page: 1 }).then(({ results }) => {
        dispatch({ type: LOAD_DATA, payload: { results } });
      });
    }
  }, [state.sort]);

  return (
    <>
      {state.isLoading && <Loader />}
      <div className="controls">
        <Sort
          sortValue={state.sort}
          onChange={(value: string) => {
            dispatch({ type: SORT, payload: { sortValue: value } });
          }}
        />
        <Search
          searchText={state.search}
          onChange={(text: string) => {
            dispatch({ type: SEARCH, payload: { search: text } });
          }}
          inputRef={inputRef}
        />
      </div>

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
