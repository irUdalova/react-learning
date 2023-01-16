// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import { Popup } from 'components/popup/Popup';
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
  SEARCH_PARAM_CHANGE,
} from 'constants/actions';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'components/pagination/Pagination';
import { getItemsAmountSearch } from 'api/helpers';

export function SearchPage() {
  // const { searchPage: state } = useContext(AppStateContext);
  const globalState = useContext(AppStateContext);
  const { searchPage: state } = globalState;

  // console.log(
  //   'paginations SearchPage',
  //   globalState.searchPage.pagination,
  //   globalState.mainPage.pagination
  // );

  const dispatch = useContext(AppDispatchContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search');
  const pageQuery = Number(searchParams.get('page'));
  const itemsQuery = searchParams.get('items');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.search) {
      dispatch({ type: LOADING });

      getItemsAmountSearch({
        itemsPerPage: state.pagination.itemsPerPage,
        searchParam: state.search,
        page: state.pagination.currentPage,
      })
        .then(({ results, totalResults, totalPages }) => {
          dispatch({
            type: LOAD_SEARCH_DATA,
            payload: { results, totalResults, totalPages },
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
  }, [state.search, state.pagination.currentPage, state.pagination.itemsPerPage]);

  useEffect(() => {
    dispatch({
      type: SEARCH_PARAM_CHANGE,
      payload: { searchParams: searchQuery, currentPage: pageQuery, itemsPerPage: itemsQuery },
    });
  }, [searchQuery, pageQuery, itemsQuery]);

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
          totalPages={state.totalPages}
          currentPage={state.pagination.currentPage}
          onPageClick={(num: number) => {
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              page: num.toString(),
            });
          }}
          onChangeItemsPerPage={(amount: number) => {
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              items: amount.toString(),
              page: '1',
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
