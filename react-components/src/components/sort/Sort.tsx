import React from 'react';
import './Sort.css';

type TSortParam = {
  sortValue: string;
  onChange: (value: string) => void;
};

export function Sort({ sortValue, onChange }: TSortParam) {
  return (
    <div className="sort">
      <p className="sort__label">Sort By</p>
      <select
        className="sort__select"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        defaultValue={sortValue}
      >
        <option value="PopularityDesc">Popularity Descending</option>
        <option value="PopularityAsc">Popularity Ascending</option>
        <option value="RatingDesc">Rating Descending</option>
        <option value="RatingAsc">Rating Ascending</option>
        <option value="ReleaseDesc">Release Date Descending</option>
        <option value="ReleaseAsc">Release Date Ascending</option>
        <option value="TitleAZ">Title (A-Z)</option>
        <option value="TitleZA">Title (Z-A)</option>
      </select>
    </div>
  );
}
