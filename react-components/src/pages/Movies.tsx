import React from 'react';
import Search from 'components/Search';
import { Movie } from 'components/Movie';
import { MovieTypes } from 'types';
import { Popup } from 'components/Popup';

type PropsType = Record<string, unknown>;

type StateType = {
  search: string;
  movies: MovieTypes[];
  isPopupOpen: boolean;
  popupMovieID: number;
};

export class Movies extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { search: '', movies: [], isPopupOpen: false, popupMovieID: 0 };
  }

  private async init() {
    const movies = await this.load();
    this.setState({ search: localStorage.getItem('search') || '', movies });
    // console.log('this.state.movies', this.state.movies);
  }

  private async load(): Promise<MovieTypes[]> {
    // const res = await fetch('/assets/data/data.json');
    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=fe7b5b02805cfd0625f13336e010ba98&language=en-US&query=Christmas&page=1&include_adult=false'
    );
    const movies = await res.json();
    console.log('movies', movies.results);

    return movies.results;
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevState: PropsType) {
    if (this.state.search !== prevState.search) {
      localStorage.setItem('search', this.state.search);
    }
  }

  get filteredMovies(): MovieTypes[] {
    if (!this.state.search) {
      return this.state.movies;
    }
    return this.state.movies.filter((mov) => {
      return mov.title.toLowerCase().includes(this.state.search.toLocaleLowerCase());
    });
  }

  render() {
    const filteredMovies = this.filteredMovies;
    return (
      <>
        <Search
          searchText={this.state.search}
          onChange={(text: string) => {
            this.setState({ search: text });
          }}
        />
        <div className="movies">
          <div className="movies-wrap">
            {!filteredMovies.length && (
              <div className="movies-wrap__msg">Sorry, no matches found</div>
            )}
            {filteredMovies.map((mov) => (
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
