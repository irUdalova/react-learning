import {
  ERROR,
  LOADED,
  LOADING,
  LOAD_DATA,
  LOAD_SEARCH_DATA,
  LOAD_SORT_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  SEARCH,
  SORT,
} from 'constants/actions';
import { IMovie, TActionMainReducer } from 'types';

export function mainReducer(state: IMovie, { type, payload }: TActionMainReducer) {
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
    case LOAD_DATA: {
      return {
        ...state,
        movies: payload.results,
        isLoading: false,
      };
    }
    case ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    case LOAD_SEARCH_DATA: {
      return {
        ...state,
        movies: payload.results,
        totalResults: payload.totalResults,
        isSearching: true,
        isLoading: false,
      };
    }
    case LOAD_SORT_DATA: {
      return {
        ...state,
        movies: payload.results,
        totalResults: payload.totalResults,
        sort: payload.sortValue,
        isLoading: false,
        search: '',
      };
    }
    case SEARCH: {
      return {
        ...state,
        search: payload.search,
      };
    }
    case SORT: {
      return {
        ...state,
        sort: payload.sortValue,
      };
    }
    case POPUP_OPEN: {
      return {
        ...state,
        isPopupOpen: true,
        popupMovieID: payload.popupMovieID,
      };
    }
    case POPUP_CLOSE: {
      return {
        ...state,
        isPopupOpen: false,
        popupMovieID: 0,
      };
    }
    default:
      return state;
  }
}
