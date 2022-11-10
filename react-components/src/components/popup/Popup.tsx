import React from 'react';
import { MovieTypes } from 'types';
import './Popup.css';

type MoviePopup = {
  movie: MovieTypes;
  onClose: () => void;
};

export class Popup extends React.Component<MoviePopup> {
  render() {
    const { title, poster_path, release_date, overview } = this.props.movie;
    return (
      <>
        <div className="backdrop" onClick={this.props.onClose} />
        <div className="popup">
          <button type="button" className="popup__close" onClick={this.props.onClose}>
            {' '}
          </button>
          <div className="popup__img-wrap">
            <img
              className="popup__img"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              width="auto"
              height="180"
            />
          </div>
          <div className="popup__description">
            <p className="popup__title">{title}</p>
            <p className="popup__year">{release_date.split('-')[0]}</p>
            <p className="popup__overview">{overview}</p>
          </div>
        </div>
      </>
    );
  }
}
