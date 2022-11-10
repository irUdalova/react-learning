import React from 'react';
import './Search.css';

type PropsValues = {
  searchText: string;
  onChange: (text: string) => void;
  // onSearch: (text: string) => void;
  onSearch: () => void;
};

export default class Search extends React.Component<PropsValues> {
  render() {
    const isSearching = !!this.props.searchText;

    return (
      <>
        <div className={`search-wrap ${isSearching ? 'search-wrap_active' : ''}`}>
          <button
            className="search-wrap__clear-btn"
            onClick={() => {
              this.props.onChange('');
            }}
          ></button>
          <input
            placeholder="Find your movie"
            type="text"
            value={this.props.searchText}
            onChange={(e) => {
              this.props.onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log('search new movies');
                this.props.onSearch();
              }
            }}
            className="search-wrap__search-inp"
            autoComplete="off"
          />
        </div>
      </>
    );
  }
}
