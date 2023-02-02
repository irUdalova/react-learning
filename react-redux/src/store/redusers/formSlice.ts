import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardType } from 'types';

const initialState = {
  cards: [] as ICardType[],
  cardForm: {
    url: '',
    name: '',
    date: '',
    country: '',
    isAgreeTerms: false,
    isAgreePromo: false,
  },
  submitSuccess: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUrlImg(state, action: PayloadAction<string>) {
      state.cardForm.url = action.payload;
    },
    formSubmit(state, action: PayloadAction<ICardType>) {
      state.cards.push(action.payload);
    },
    formSubmitSuccess(state) {
      state.submitSuccess = true;
    },
    formReset(state) {
      state.submitSuccess = false;
      state.cardForm.url = '';
      state.cardForm.name = '';
      state.cardForm.date = '';
      state.cardForm.country = '';
      state.cardForm.isAgreePromo = false;
      state.cardForm.isAgreeTerms = false;
    },
    changeName(state, action: PayloadAction<string>) {
      state.cardForm.name = action.payload;
    },
    changeDate(state, action: PayloadAction<string>) {
      state.cardForm.date = action.payload;
    },
    changeCountry(state, action: PayloadAction<string>) {
      state.cardForm.country = action.payload;
    },
    agreeTerms(state, action: PayloadAction<boolean>) {
      state.cardForm.isAgreeTerms = action.payload;
    },
    agreePromo(state, action: PayloadAction<boolean>) {
      state.cardForm.isAgreePromo = action.payload;
    },
  },
});

export const formReducer = formSlice.reducer;
