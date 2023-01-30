import {
  ERROR,
  LOADED,
  LOADING,
  LOAD_SEARCH_DATA,
  POPUP_CLOSE,
  POPUP_OPEN,
  SEARCH_PARAM_CHANGE,
} from 'constants/actions';
import { ISearch, TActionMainReducer } from 'types';

export function searchReducer(
  state: ISearch,
  { type, payload }: TActionMainReducer,
  initialState: ISearch
) {
  switch (type) {
    case SEARCH_PARAM_CHANGE: {
      return {
        ...state,
        search: payload.searchParams || initialState.search,
        pagination: {
          ...state.pagination,
          currentPage: payload.currentPage || initialState.pagination.currentPage,
          itemsPerPage: payload.itemsPerPage || initialState.pagination.itemsPerPage,
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
        isLoading: false,
        totalPages: payload.totalPages,
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
