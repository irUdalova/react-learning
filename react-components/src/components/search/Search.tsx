import React, { LegacyRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

type TSearchParams = {
  searchText: string;
  onChange: (text: string) => void;
  inputRef: LegacyRef<HTMLInputElement>;
};

export function Search({ searchText, onChange, inputRef = null }: TSearchParams) {
  const isSearching = !!searchText;
  const navigate = useNavigate();

  return (
    <>
      <div className={`search-wrap ${isSearching ? 'search-wrap_active' : ''}`}>
        <label
          htmlFor="searchInput"
          className="search-wrap__clear-btn"
          onClick={() => {
            onChange('');
          }}
        ></label>
        <input
          id="searchInput"
          placeholder="Find your movie"
          type="text"
          value={searchText}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/search?search=${searchText}`);
            }
          }}
          className="search-wrap__search-inp"
          autoComplete="off"
        />
      </div>
    </>
  );
}
