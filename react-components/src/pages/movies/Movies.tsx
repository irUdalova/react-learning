// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Sort } from 'components/sort/Sort';
import { Movie } from 'components/movie/Movie';
import { Pagination } from 'components/pagination/Pagination';
import { Popup } from 'components/popup/Popup';
import './Movies.css';
import { Loader } from 'components/loader/Loader';
import { AppDispatchContext, AppStateContext } from 'App';
import { MovieType } from 'types';
import {
  ERROR,
  LOADED,
  LOADING,
  LOAD_SORT_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  QUERY_PARAM_CHANGE,
} from 'constants/actions';
import { sortMovies } from 'api/sort';
import { useSearchParams } from 'react-router-dom';

export function Movies() {
  const { mainPage: state } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [queryParams, setQueryParams] = useSearchParams();
  console.log('queryParam', queryParams);

  const sortQuery = queryParams.get('sort');
  const pageQuery = Number(queryParams.get('page'));

  useEffect(() => {
    if (state.sort) {
      dispatch({ type: LOADING });

      sortMovies({ sortParam: state.sort, page: state.pagination.currentPage })
        .then(({ results, totalResults }) => {
          dispatch({
            type: LOAD_SORT_DATA,
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
  }, [state.sort, state.pagination.currentPage]);

  useEffect(() => {
    dispatch({
      type: QUERY_PARAM_CHANGE,
      payload: { sortValue: sortQuery, currentPage: pageQuery },
    });
  }, [sortQuery, pageQuery]);

  return (
    <>
      {state.isLoading && <Loader />}
      {state.isError && (
        <div className="search-results">Something went wrong, please try again!</div>
      )}
      <div className="controls">
        <Sort
          sortValue={state.sort}
          onChange={(value: string) => {
            setQueryParams({ sort: value });
          }}
        />
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
            setQueryParams({ ...Object.fromEntries(queryParams.entries()), page: num.toString() });
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
