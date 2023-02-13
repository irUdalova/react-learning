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
import { mainSlice } from 'store/redusers/mainSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useGetSortMoviesQuery } from 'store/mdbAPI/api';

export function MainPage() {
  const { queryParamChange } = mainSlice.actions;

  const { sort, pagination } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetSortMoviesQuery({
    sortParam: sort,
    page: pagination.currentPage,
    itemsPerPage: pagination.itemsPerPage,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [queryParams, setQueryParams] = useSearchParams();
  const navigate = useNavigate();

  const sortQuery = queryParams.get('sort');
  const pageQuery = Number(queryParams.get('page'));
  const itemsQuery = Number(queryParams.get('items'));

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
          {data?.results.map((mov: MovieType, i: number) => (
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
      {!!data?.totalResults && (
        <Pagination
          itemsPerPage={pagination.itemsPerPage}
          totalPages={data?.totalPages}
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
