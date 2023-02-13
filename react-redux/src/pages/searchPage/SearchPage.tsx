// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import '../mainPage/MainPage.css';
import { Loader } from 'components/loader/Loader';
import { MovieType } from 'types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'components/pagination/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { searchSlice } from 'store/redusers/searchSlice';
import { useGetSearchMoviesQuery } from 'store/mdbAPI/api';

export function SearchPage() {
  const { searchParamChange } = searchSlice.actions;

  const { search, pagination } = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetSearchMoviesQuery({
    searchParam: search,
    page: pagination.currentPage,
    itemsPerPage: pagination.itemsPerPage,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search');
  const pageQuery = Number(searchParams.get('page'));
  const itemsQuery = Number(searchParams.get('items'));
  const inputRef = useRef<HTMLInputElement>(null);

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
        {!data?.results.length && !isError && (
          <div className="search-results">No movies found, please try again!</div>
        )}
        {!isError && !!data?.results.length && (
          <div className="search-results">
            <span>{`Over ${data.totalResults} results for `}</span>
            <span className="search-results__query">{`"${search || searchQuery}"`}</span>
          </div>
        )}
        <Search inputRef={inputRef} />
      </div>

      <div className="movies">
        <div className="movies-wrap">
          {data?.results.map((mov: MovieType) => {
            return (
              <Movie
                key={mov.id.toString()}
                movie={mov}
                onMovieClick={() => {
                  navigate(`/${mov.id}`);
                }}
              />
            );
          })}
        </div>
      </div>
      {!!data?.totalResults && (
        <Pagination
          itemsPerPage={pagination.itemsPerPage}
          totalPages={data?.totalPages}
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
