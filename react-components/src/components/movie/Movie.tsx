import React from 'react';
import { MovieTypes } from 'types';
import './Movie.css';

type MovieParam = {
  movie: MovieTypes;
  onMovieClick: () => void;
};

export class Movie extends React.Component<MovieParam> {
  render() {
    const { title, poster_path, release_date } = this.props.movie;
    return (
      <>
        <div className="movie__item" onClick={this.props.onMovieClick}>
          <div className="movie__img-wrap">
            <img
              className="movie__img"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              width="auto"
              height="180"
            />
          </div>
          <p className="movie__name">{title}</p>
          <p className="movie__year">{release_date.split('-')[0]}</p>
        </div>
      </>
    );
  }
}
