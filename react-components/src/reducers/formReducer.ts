import {
  AGREE_PROMO,
  AGREE_TERMS,
  CHANGE_COUNTRY,
  CHANGE_DATE,
  CHANGE_NAME,
  FORM_RESET,
  FORM_SUBMIT,
  FORM_SUBMIT_SUC,
  SET_URL_IMG,
} from 'constants/actions';
import { IForm, TActionMainReducer } from 'types';

export function formReducer(state: IForm, { type, payload }: TActionMainReducer) {
  switch (type) {
    case SET_URL_IMG: {
      return {
        ...state,
        cardForm: {
          ...state.cardForm,
          url: payload.url,
        },
      };
    }
    case FORM_SUBMIT: {
      return {
        ...state,
        cards: [...state.cards, payload.formData],
      };
    }
    case FORM_SUBMIT_SUC: {
      return {
        ...state,
        submitSuccess: true,
      };
    }
    case FORM_RESET: {
      return {
        ...state,
        submitSuccess: false,
        cardForm: {
          url: '',
          name: '',
          date: '',
          country: '',
          isAgreeTerms: false,
          isAgreePromo: false,
        },
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        cardForm: {
          ...state.cardForm,
          name: payload.name,
        },
      };
    }
    case CHANGE_DATE: {
      return {
        ...state,
        cardForm: {
          ...state.cardForm,
          date: payload.date,
        },
      };
    }
    case CHANGE_COUNTRY: {
      return {
        ...state,
        cardForm: {
          ...state.cardForm,
          country: payload.country,
        },
      };
    }
    case AGREE_TERMS: {
      return {
        ...state,
        cardForm: {
          ...state.cardForm,
          isAgreeTerms: payload.isAgreeTerms,
        },
      };
    }
    case AGREE_PROMO: {
      return {
        ...state,
        cardForm: {
          ...state.cardForm,
          isAgreePromo: payload.isAgreePromo,
        },
      };
    }

    default:
      return state;
  }
}
