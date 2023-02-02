import { PosterImage } from 'components/poster/PosterImage';
import React from 'react';
import { MovieType } from 'types';
import './Popup.css';

type MoviePopup = {
  movie: MovieType;
  onClose: () => void;
};

export function Popup({ movie, onClose }: MoviePopup) {
  const { title, posterPath, releaseDate, overview } = movie;
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="popup">
        <button type="button" className="popup__close" onClick={onClose}>
          {' '}
        </button>
        <div className="popup__img-wrap">
          <PosterImage posterPath={posterPath} title={title} className="popup__img" height="180" />
        </div>
        <div className="popup__description">
          <p className="popup__title">{title}</p>
          <p className="popup__year">{releaseDate.split('-')[0]}</p>
          <p className="popup__overview">{overview}</p>
        </div>
      </div>
    </>
  );
}
