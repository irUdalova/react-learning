import { ERROR, LOADED, LOADING, LOAD_MOVIE_DATA } from 'constants/actions';
import { IMoviePage, TActionMainReducer } from 'types';

export function movieReducer(state: IMoviePage, { type, payload }: TActionMainReducer) {
  switch (type) {
    case LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case LOADED: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        isLoaded: true,
      };
    }
    case ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    case LOAD_MOVIE_DATA: {
      return {
        ...state,
        movieData: payload.movie,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
