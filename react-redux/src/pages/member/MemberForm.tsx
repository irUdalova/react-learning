// import { AppDispatchContext, AppStateContext } from 'App';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useForm } from 'react-hook-form';
import { formSlice } from 'store/redusers/formSlice';
import './Member.css';

type FormDataType = {
  userName: string;
  userDate: string;
  userCountry: string;
  userAgree: boolean;
  userPromo: boolean;
};

export function MemberForm() {
  const {
    setUrlImg,
    formSubmit,
    formSubmitSuccess,
    formReset,
    changeName,
    changeDate,
    changeCountry,
    agreeTerms,
    agreePromo,
  } = formSlice.actions;
  const { url, name, date, country, isAgreeTerms, isAgreePromo } = useAppSelector(
    (state) => state.formReducer.cardForm
  );
  const { submitSuccess } = useAppSelector((state) => state.formReducer);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({});

  const handleChangeFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      dispatch(setUrlImg(reader.result as string));
    };
  };

  const resetForm = () => {
    dispatch(formReset());
    reset();
  };

  const onSubmit = (data: FormDataType) => {
    const cardData = {
      id: Math.random(),
      url: url || '',
      name: data.userName,
      date: data.userDate,
      country: data.userCountry,
      isAgreeTerms: data.userAgree,
      isAgreePromo: data.userPromo,
    };

    dispatch(formSubmit(cardData));

    if (cardData) {
      dispatch(formSubmitSuccess());
      setTimeout(resetForm, 2000);
    }
  };

  return (
    <>
      {submitSuccess && (
        <div className="submit-success">Your data has been successfully saved!</div>
      )}
      <form className="form" onSubmit={handleSubmit(onSubmit)} id="form-member">
        <div className="avatar-field">
          <div className="avatar-img">
            {url && <img className="avatar-img__uploaded" width={90} height={90} src={url} />}
            {!url && (
              <img
                className="avatar-img__unknown"
                width={90}
                height={90}
                src="assets/svg/user.svg"
              />
            )}
          </div>
          <input
            className="avatar-field__input"
            type="file"
            accept=".jpg, .jpeg, .png"
            id="file"
            onChange={(e) => {
              if (!e.target.files) return;
              handleChangeFile(e.target.files[0]);
            }}
          />
          <label className="avatar-field__label" htmlFor="file">
            Choose an image
          </label>
        </div>

        <div className="name-field">
          <label className="text-field__label" htmlFor="UserName">
            Name
          </label>
          <input
            className={`text-field__input ${errors?.userName ? 'form__input_error' : ''}`}
            type="text"
            id="userName"
            {...register('userName', {
              required: 'Please, enter your name!',
              onChange: (e) => {
                dispatch(changeName(e.target.value));
              },
              value: name,
            })}
            placeholder="User Name"
          />
          {errors?.userName && <p className="form__error">{`${errors?.userName?.message}`}</p>}
        </div>

        <div className="date-field">
          <label className="text-field__label" htmlFor="date">
            Date of Birth
          </label>
          <input
            className={`text-field__input ${errors.userDate ? 'form__input_error' : ''}`}
            type="date"
            id="date"
            {...register('userDate', {
              required: 'Please, enter your date of birth!',
              onChange: (e) => {
                dispatch(changeDate(e.target.value));
              },
              value: date,
            })}
          />
          {errors?.userDate && <p className="form__error">{`${errors?.userDate?.message}`}</p>}
        </div>

        <div className="select-field">
          <p className="select__label">Countries</p>
          <select
            className={`select ${errors.userCountry ? 'form__input_error' : ''} `}
            {...register('userCountry', {
              required: 'Please, choose your country!',
              onChange: (e) => {
                dispatch(changeCountry(e.target.value));
              },
              value: country,
            })}
          >
            <option value="" disabled className="select__placeholder">
              Select your option
            </option>
            <option value="Ukraine">Ukraine</option>
            <option value="Poland">Poland</option>
            <option value="France">France</option>
            <option value="USA">USA</option>
          </select>
          {errors.userCountry && <p className="form__error">{`${errors?.userCountry?.message}`}</p>}
        </div>

        <div className="check-field">
          <input
            className="check-field__input"
            type="checkbox"
            id="userAgree"
            {...register('userAgree', {
              required: 'You must agree with the rules!',
              onChange: (e) => {
                dispatch(agreeTerms(e.target.value));
              },
              value: isAgreeTerms,
            })}
            defaultChecked={false}
          />
          <label className="check-field__label" htmlFor="userAgree">
            I agree to the terms and conditions.
          </label>
          {errors.userAgree && <p className="agree__error">{`${errors?.userAgree?.message}`}</p>}
        </div>

        <div className="switch-field">
          <label className="switch">
            <input
              type="checkbox"
              {...register('userPromo', {
                onChange: (e) => {
                  dispatch(agreePromo(e.target.value));
                },
                value: isAgreePromo,
              })}
            />
            <span className="slider round"></span>
          </label>
          <p className="switch-field__text">I want to receive notifications about promo</p>
        </div>

        <input
          className="submit-btn"
          type="submit"
          value="Create"
          disabled={!!Object.values(errors).length}
        />
      </form>
    </>
  );
}
