import React from 'react';
import Search from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import { MovieTypes } from 'types';
import { Popup } from 'components/popup/Popup';
import { getPopular } from 'api/popular';
import { searchMovies } from 'api/search';

type PropsType = Record<string, unknown>;

type StateType = {
  search: string;
  isSearching: boolean;
  movies: MovieTypes[];
  isPopupOpen: boolean;
  popupMovieID: number;
  totalResults: number;
};

export class Movies extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      search: '',
      isSearching: false,
      movies: [],
      isPopupOpen: false,
      popupMovieID: 0,
      totalResults: 0,
    };
  }

  private async init() {
    // console.log('init');
    const { results } = await getPopular({ page: 1 });
    this.setState({
      ...this.setState,
      movies: results,
    });
    // console.log('this.state.movies', this.state.movies, totalResults);
  }

  private async search(searchParam: string): Promise<void> {
    // const searchPath = generatePath('/?s=:search', { search: searchParam });
    // console.log('aaa', searchPath);
    const { results, total_results: totalResults } = await searchMovies({ page: 1, searchParam });
    this.setState({ ...this.state, movies: results, totalResults, isSearching: true });
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <>
        <Search
          searchText={this.state.search}
          onChange={(text: string) => {
            this.setState({ search: text });
          }}
          onSearch={() => {
            this.search(this.state.search);
          }}
        />
        {/* {this.state.isSearching && (
          <div className="search-results">
            {`We have ${this.state.totalResults} results for "${this.state.search}"`}
          </div>
        )} */}
        <div className="movies">
          <div className="movies-wrap">
            {this.state.movies.map((mov) => (
              <Movie
                key={mov.id.toString()}
                movie={mov}
                onMovieClick={() =>
                  this.setState({ ...this.state, isPopupOpen: true, popupMovieID: mov.id })
                }
              />
            ))}
          </div>
        </div>
        {this.state.isPopupOpen && (
          <Popup
            movie={
              this.state.movies.find((mov) => mov.id === this.state.popupMovieID) ||
              this.state.movies[0]
            }
            onClose={() => this.setState({ ...this.state, isPopupOpen: false, popupMovieID: 0 })}
          />
        )}
      </>
    );
  }
}
