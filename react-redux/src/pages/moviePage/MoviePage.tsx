// import { getMovie } from 'api/movie';
import { Loader } from 'components/loader/Loader';
import { PosterImage } from 'components/poster/PosterImage';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieData } from 'store/redusers/movieSlice';
import './MoviePage.css';

type TGenre = {
  id: number;
  name: string;
};

export function MoviePage() {
  const { title, posterPath, releaseDate, overview, genres, tagline, vote, runtime } =
    useAppSelector((state) => state.movieReducer.movieData);
  const { isError, isLoading, isLoaded } = useAppSelector((state) => state.movieReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const movieId = Number(id);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    dispatch(fetchMovieData({ id: movieId }));
  }, [movieId]);

  if (isLoading) return <Loader />;

  return (
    <>
      {isError && <div className="search-results">Something went wrong, please try again!</div>}
      <button type="button" className="movie-page__back" onClick={goBack}>
        {`❮ back`}
      </button>
      {isLoaded && (
        <React.Fragment>
          <div className="movie-page">
            <div className="movie-page__img-wrap">
              <PosterImage
                posterPath={posterPath}
                title={title}
                className="movie-page__img"
                height="180"
              />
            </div>
            <div className="movie-page__description">
              <p className="movie-page__title">{title}</p>
              {!!tagline && <p className="movie-page__tagline">{tagline}</p>}
              {!!releaseDate && <p className="movie-page__year">{releaseDate.split('-')[0]}</p>}
              {!!vote && (
                <p className="movie-page__vote">
                  <span>Rate: </span>
                  {vote.toFixed(1)}
                </p>
              )}
              {!!genres.length && (
                <p className="movie-page__genres">
                  <span>Genres: </span>
                  <span>{genres.map((genre: TGenre) => genre.name).join(', ')}</span>
                </p>
              )}
              {!!runtime && (
                <p className="movie-page__runtime">
                  <span>Runtime: </span>
                  {runtime} <span>min</span>
                </p>
              )}
              <p className="movie-page__overview">{overview}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
}
