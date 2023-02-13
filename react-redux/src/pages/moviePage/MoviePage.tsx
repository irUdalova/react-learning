// import { getMovie } from 'api/movie';
import { Loader } from 'components/loader/Loader';
import { PosterImage } from 'components/poster/PosterImage';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieQuery } from 'store/mdbAPI/api';
import './MoviePage.css';

type TGenre = {
  id: number;
  name: string;
};

export function MoviePage() {
  const { id } = useParams();
  const movieId = Number(id);

  const { data, isLoading, isError, isSuccess } = useGetMovieQuery({ id: movieId });

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  if (isLoading) return <Loader />;

  return (
    <>
      {isError && <div className="search-results">Something went wrong, please try again!</div>}
      <button type="button" className="movie-page__back" onClick={goBack}>
        {`❮ back`}
      </button>
      {isSuccess && (
        <React.Fragment>
          <div className="movie-page">
            <div className="movie-page__img-wrap">
              <PosterImage
                posterPath={data.posterPath}
                title={data.title}
                className="movie-page__img"
                height="180"
              />
            </div>
            <div className="movie-page__description">
              <p className="movie-page__title">{data.title}</p>
              {!!data.tagline && <p className="movie-page__tagline">{data.tagline}</p>}
              {!!data.releaseDate && (
                <p className="movie-page__year">{data.releaseDate.split('-')[0]}</p>
              )}
              {!!data.vote && (
                <p className="movie-page__vote">
                  <span>Rate: </span>
                  {data.vote.toFixed(1)}
                </p>
              )}
              {!!data.genres.length && (
                <p className="movie-page__genres">
                  <span>Genres: </span>
                  <span>{data.genres.map((genre: TGenre) => genre.name).join(', ')}</span>
                </p>
              )}
              {!!data.runtime && (
                <p className="movie-page__runtime">
                  <span>Runtime: </span>
                  {data.runtime} <span>min</span>
                </p>
              )}
              <p className="movie-page__overview">{data.overview}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
}
