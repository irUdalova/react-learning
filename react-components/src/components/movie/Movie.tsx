import { PosterImage } from 'components/poster/PosterImage';
import React from 'react';
import { MovieType } from 'types';
import './Movie.css';

type MovieParam = {
  movie: MovieType;
  onMovieClick: () => void;
};

export function Movie({ movie, onMovieClick }: MovieParam) {
  const { title, posterPath, releaseDate } = movie;
  // console.log('movie', movie);

  return (
    <>
      <div className="movie__item" onClick={onMovieClick}>
        <div className="movie__img-wrap">
          <PosterImage className="movie__img" posterPath={posterPath} title={title} height="180" />
        </div>
        <p className="movie__name">{title}</p>
        <p className="movie__year">{releaseDate ? releaseDate.split('-')[0] : ''}</p>
      </div>
    </>
  );
}
