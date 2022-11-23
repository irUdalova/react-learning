import React from 'react';
import './Search.css';

type PropsValues = {
  searchText: string;
  onChange: (text: string) => void;
  onSearch: () => void;
};

export function Search({ searchText, onChange, onSearch }: PropsValues) {
  const isSearching = !!searchText;

  return (
    <>
      <div className={`search-wrap ${isSearching ? 'search-wrap_active' : ''}`}>
        <button
          className="search-wrap__clear-btn"
          onClick={() => {
            onChange('');
          }}
        ></button>
        <input
          placeholder="Find your movie"
          type="text"
          value={searchText}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('search new movies');
              onSearch();
            }
          }}
          className="search-wrap__search-inp"
          autoComplete="off"
        />
      </div>
    </>
  );
}
