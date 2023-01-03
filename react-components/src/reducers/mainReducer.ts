import {
  ERROR,
  LOADED,
  LOADING,
  LOAD_SEARCH_DATA,
  LOAD_SORT_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  QUERY_PARAM_CHANGE,
  SET_CURRENT_PAGE,
} from 'constants/actions';
import { IMovie, TActionMainReducer } from 'types';

export function mainReducer(
  state: IMovie,
  { type, payload }: TActionMainReducer,
  initialState: IMovie
) {
  // console.log('mainReducer, initial', initialState);
  switch (type) {
    case QUERY_PARAM_CHANGE: {
      return {
        ...state,
        sort: payload.sortValue || initialState.sort,
        pagination: {
          ...state.pagination,
          currentPage: payload.currentPage || initialState.pagination.currentPage,
        },
      };
    }
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
        isLoading: false,
        search: '',
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: payload.currentPage,
        },
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
