import React from 'react';
import Search from 'components/search/Search';
import { Movie } from 'components/movie/Movie';
import { MovieTypes } from 'types';
import { Popup } from 'components/popup/Popup';
import { getPopular } from 'api/popular';
import { searchMovies } from 'api/search';
import './Movies.css';
import { Loader } from 'components/loader/Loader';

type PropsType = Record<string, unknown>;

type StateType = {
  search: string;
  isSearching: boolean;
  movies: MovieTypes[];
  isPopupOpen: boolean;
  popupMovieID: number;
  totalResults: number;
  isError: boolean;
  isLoading: boolean;
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
      isError: false,
      isLoading: false,
    };
  }

  private async init() {
    this.setState({ ...this.state, isError: false, isLoading: true });
    // console.log('init');
    try {
      const { results } = await getPopular({ page: 1 });
      this.setState({
        ...this.setState,
        movies: results,
        isLoading: false,
      });
    } catch {
      this.setState({ ...this.state, isError: true });
    }
    // console.log('this.state.movies', this.state.movies, totalResults);
  }

  private async search(searchParam: string): Promise<void> {
    this.setState({ ...this.state, isError: false, isLoading: true });
    // const searchPath = generatePath('/?s=:search', { search: searchParam });
    // console.log('aaa', searchPath);
    try {
      const { results, total_results: totalResults } = await searchMovies({ page: 1, searchParam });
      console.log('movies', results);
      this.setState({
        ...this.state,
        movies: results,
        totalResults,
        isSearching: true,
        isLoading: false,
      });
    } catch {
      this.setState({ ...this.state, isError: true });
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <>
        {this.state.isLoading && <Loader />}
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
        {this.state.isError && (
          <div className="search-results">{'Something went wrong, please try again!'}</div>
        )}
        {!this.state.movies.length && !this.state.isError && (
          <div className="search-results">{'No movies found, please try again!'}</div>
        )}
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
