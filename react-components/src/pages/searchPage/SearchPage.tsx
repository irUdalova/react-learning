// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import { Popup } from 'components/popup/Popup';
import { searchMovies } from 'api/search';
import '../movies/Movies';
import '../movies/Movies.css';
import { Loader } from 'components/loader/Loader';
import { AppDispatchContext, AppStateContext } from 'App';
import { MovieType } from 'types';
import {
  ERROR,
  LOADED,
  LOADING,
  LOAD_SEARCH_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  SEARCH,
} from 'constants/actions';
import { useSearchParams } from 'react-router-dom';

export function SearchPage() {
  const { mainPage: state } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery) {
      dispatch({ type: LOADING });

      searchMovies({ page: 1, searchParam: searchQuery })
        .then(({ results, totalResults }) => {
          dispatch({ type: LOAD_SEARCH_DATA, payload: { results, totalResults } });
        })
        .catch(() => {
          dispatch({ type: ERROR });
        })
        .finally(() => {
          dispatch({ type: LOADED });
        });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  return (
    <>
      {state.isLoading && <Loader />}
      <div className="controls">
        {state.isError && (
          <div className="search-results">Something went wrong, please try again!</div>
        )}
        {!state.movies.length && !state.isError && (
          <div className="search-results">No movies found, please try again!</div>
        )}
        {!state.isError && !!state.movies.length && (
          <div className="search-results">
            <span>{`Over ${state.totalResults} results for `}</span>
            <span className="search-results__query">{`"${state.search || searchQuery}"`}</span>
          </div>
        )}
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
