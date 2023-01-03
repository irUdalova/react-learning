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
  QUERY_PARAM_CHANGE,
} from 'constants/actions';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'components/pagination/Pagination';

export function SearchPage() {
  const { searchPage: state } = useContext(AppStateContext);
  // console.log('searchPage: state ', state);

  const dispatch = useContext(AppDispatchContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search');
  const pageQuery = Number(searchParams.get('page'));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery) {
      dispatch({ type: LOADING });

      searchMovies({ searchParam: state.search, page: state.pagination.currentPage })
        .then(({ results, totalResults }) => {
          dispatch({
            type: LOAD_SEARCH_DATA,
            payload: { results, totalResults },
          });
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
  }, [state.search, state.pagination.currentPage]);

  useEffect(() => {
    dispatch({
      type: QUERY_PARAM_CHANGE,
      payload: { searchParams: searchQuery, currentPage: pageQuery },
    });
  }, [searchQuery, pageQuery]);

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
        <Search inputRef={inputRef} />
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
      {!!state.totalResults && (
        <Pagination
          itemsPerPage={state.pagination.itemsPerPage}
          totalResults={state.totalResults}
          currentPage={state.pagination.currentPage}
          onPageClick={(num: number) => {
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              page: num.toString(),
            });
          }}
        />
      )}
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
