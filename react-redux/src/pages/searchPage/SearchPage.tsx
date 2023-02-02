// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import '../mainPage/MainPage.css';
import { Loader } from 'components/loader/Loader';
import { MovieType } from 'types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'components/pagination/Pagination';
import { getItemsAmountSearch } from 'api/helpers';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { searchSlice } from 'store/redusers/searchSlice';

export function SearchPage() {
  const { searchParamChange, loadSearchData, loading, loaded, error } = searchSlice.actions;
  const { search, pagination, isLoading, isError, movies, totalResults } = useAppSelector(
    (state) => state.searchReducer
  );
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search');
  const pageQuery = Number(searchParams.get('page'));
  const itemsQuery = Number(searchParams.get('items'));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search) {
      dispatch(loading());

      getItemsAmountSearch({
        itemsPerPage: pagination.itemsPerPage,
        searchParam: search,
        page: pagination.currentPage,
      })
        .then(({ results, totalResults, totalPages }) => {
          dispatch(loadSearchData({ results, totalResults, totalPages }));
        })
        .catch(() => {
          dispatch(error());
        })
        .finally(() => {
          dispatch(loaded());
        });
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [search, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(
      searchParamChange({
        searchParams: searchQuery,
        currentPage: pageQuery,
        itemsPerPage: itemsQuery,
      })
    );
  }, [searchQuery, pageQuery, itemsQuery]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="controls">
        {isError && <div className="search-results">Something went wrong, please try again!</div>}
        {!movies.length && !isError && (
          <div className="search-results">No movies found, please try again!</div>
        )}
        {!isError && !!movies.length && (
          <div className="search-results">
            <span>{`Over ${totalResults} results for `}</span>
            <span className="search-results__query">{`"${search || searchQuery}"`}</span>
          </div>
        )}
        <Search inputRef={inputRef} />
      </div>

      <div className="movies">
        <div className="movies-wrap">
          {movies.map((mov: MovieType) => (
            <Movie
              key={mov.id.toString()}
              movie={mov}
              onMovieClick={() => {
                navigate(`/${mov.id}`);
              }}
            />
          ))}
        </div>
      </div>
      {!!totalResults && (
        <Pagination
          itemsPerPage={pagination.itemsPerPage}
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
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
    </>
  );
}
