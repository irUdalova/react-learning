// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Search } from 'components/search/Search';
import { Sort } from 'components/sort/Sort';
import { Movie } from 'components/movie/Movie';
import { Pagination } from 'components/pagination/Pagination';
import './MainPage.css';
import { Loader } from 'components/loader/Loader';
import { MovieType } from 'types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchSortData, mainSlice } from 'store/redusers/mainSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export function MainPage() {
  const { queryParamChange } = mainSlice.actions;
  const { sort, pagination, isLoading, isError, movies, totalResults } = useAppSelector(
    (state) => state.mainReducer
  );
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const [queryParams, setQueryParams] = useSearchParams();
  const navigate = useNavigate();

  const sortQuery = queryParams.get('sort');
  const pageQuery = Number(queryParams.get('page'));
  const itemsQuery = Number(queryParams.get('items'));

  useEffect(() => {
    if (sort) {
      dispatch(
        fetchSortData({
          itemsPerPage: pagination.itemsPerPage,
          sortParam: sort,
          page: pagination.currentPage,
        })
      );
    }
  }, [sort, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(
      queryParamChange({
        sortValue: sortQuery,
        currentPage: pageQuery,
        itemsPerPage: itemsQuery,
      })
    );
  }, [sortQuery, pageQuery, itemsQuery]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <div className="search-results">Something went wrong, please try again!</div>}
      <div className="controls">
        <Sort
          sortValue={sort}
          onChange={(value: string) => {
            setQueryParams({
              sort: value,
              items: pagination.itemsPerPage.toString(),
            });
          }}
        />
        <Search inputRef={inputRef} />
      </div>

      <div className="movies">
        <div className="movies-wrap">
          {movies.map((mov: MovieType, i: number) => (
            <Movie
              key={`${mov.id.toString()}${i}`}
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
            setQueryParams({ ...Object.fromEntries(queryParams.entries()), page: num.toString() });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onChangeItemsPerPage={(amount: number) => {
            setQueryParams({
              ...Object.fromEntries(queryParams.entries()),
              items: amount.toString(),
              page: '1',
            });
          }}
        />
      )}
    </>
  );
}
