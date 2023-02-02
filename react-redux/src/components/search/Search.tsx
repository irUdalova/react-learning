import React, { LegacyRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Search.css';

type TSearchParams = {
  inputRef: LegacyRef<HTMLInputElement>;
};

export function Search({ inputRef = null }: TSearchParams) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [searchText, setSearchText] = useState(searchQuery);
  const navigate = useNavigate();
  const isSearching = !!searchText;

  return (
    <>
      <div className={`search-wrap ${isSearching ? 'search-wrap_active' : ''}`}>
        <label
          htmlFor="searchInput"
          className="search-wrap__clear-btn"
          onClick={() => {
            setSearchText('');
          }}
        ></label>
        <input
          id="searchInput"
          placeholder="Find your movie"
          type="text"
          value={searchText || ''}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/search?search=${searchText}&page=1`);
            }
          }}
          className="search-wrap__search-inp"
          autoComplete="off"
        />
      </div>
    </>
  );
}
