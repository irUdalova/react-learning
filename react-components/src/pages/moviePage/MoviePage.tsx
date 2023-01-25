import { getMovie } from 'api/movie';
import { AppDispatchContext, AppStateContext } from 'App';
import { Loader } from 'components/loader/Loader';
import { PosterImage } from 'components/poster/PosterImage';
import { ERROR, LOADED, LOADING, LOAD_MOVIE_DATA } from 'constants/actions';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MoviePage.css';

type TGenre = {
  id: number;
  name: string;
};

export function MoviePage() {
  const globalState = useContext(AppStateContext);
  const { moviePage: state } = globalState;
  const dispatch = useContext(AppDispatchContext);
  const { id } = useParams();
  const movieId = Number(id);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    dispatch({ type: LOADING });
    getMovie({ id: movieId })
      .then((movie) => {
        dispatch({
          type: LOAD_MOVIE_DATA,
          payload: { movie },
        });
      })
      .catch(() => {
        dispatch({ type: ERROR });
      })
      .finally(() => {
        dispatch({ type: LOADED });
      });
  }, [movieId]);

  const { title, posterPath, releaseDate, overview, genres, tagline, vote, runtime } =
    state.movieData;

  if (state.isLoading) return <Loader />;

  return (
    <>
      <button type="button" className="movie-page__back" onClick={goBack}>
        {`❮ back`}
      </button>
      <div className="movie-page">
        <div className="movie-page__img-wrap">
          {posterPath && (
            <PosterImage
              posterPath={posterPath}
              title={title}
              className="movie-page__img"
              height="180"
            />
          )}
        </div>
        <div className="movie-page__description">
          <p className="movie-page__title">{title}</p>
          {tagline && <p className="movie-page__tagline">{tagline}</p>}
          {releaseDate && <p className="movie-page__year">{releaseDate.split('-')[0]}</p>}
          {vote && (
            <p className="movie-page__vote">
              <span>Rate: </span>
              {vote.toFixed(1)}
            </p>
          )}
          {genres && (
            <p className="movie-page__genres">
              <span>Genres: </span>
              <span>{genres.map((genre: TGenre) => genre.name).join(', ')}</span>
            </p>
          )}
          {runtime && (
            <p className="movie-page__runtime">
              <span>Runtime: </span>
              {runtime} <span>min</span>
            </p>
          )}
          <p className="movie-page__overview">{overview}</p>
        </div>
      </div>
    </>
  );
}
