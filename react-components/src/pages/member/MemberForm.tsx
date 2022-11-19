import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardType } from 'types';
import './Member.css';

type PropsMemberType = {
  onSubmitForm: (cardData: CardType) => void;
};

type FormDataType = {
  userName: string;
  userDate: string;
  userCountry: string;
  userAgree: boolean;
  userPromo: boolean;
};

export function MemberForm({ onSubmitForm }: PropsMemberType) {
  const [urlImg, setUrlImg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    defaultValues: {
      userAgree: false,
    },
  });

  const handleChangeFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem('avatar', reader.result as string);
      setUrlImg(reader.result as string);
    };
  };

  const onSubmit = (data: FormDataType) => {
    const cardData = {
      id: Math.random(),
      url: urlImg || '',
      name: data.userName,
      date: data.userDate,
      country: data.userCountry,
      isAgreeTerms: data.userAgree,
      isAgreePromo: data.userPromo,
    };
    onSubmitForm(cardData);

    if (cardData) {
      setSubmitSuccess(true);
      setTimeout(resetForm, 2000);
    }
  };

  const resetForm = () => {
    setUrlImg('');
    reset();
    setSubmitSuccess(false);
  };

  return (
    <>
      {submitSuccess && (
        <div className="submit-success">Your data has been successfully saved!</div>
      )}
      <form className="form" onSubmit={handleSubmit(onSubmit)} id="form-member">
        <div className="avatar-field">
          <div className="avatar-img">
            {urlImg && <img className="avatar-img__uploaded" width={90} height={90} src={urlImg} />}
            {!urlImg && (
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
            {...register('userName', { required: 'Please, enter your name!' })}
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
            {...register('userDate', { required: 'Please, enter your date of birth!' })}
          />
          {errors?.userDate && <p className="form__error">{`${errors?.userDate?.message}`}</p>}
        </div>

        <div className="select-field">
          <p className="select__label">Countries</p>
          <select
            className={`select ${errors.userCountry ? 'form__input_error' : ''} `}
            {...register('userCountry', { required: 'Please, choose your country!' })}
            defaultValue={''}
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
            {...register('userAgree', { required: 'You must agree with the rules!' })}
            defaultChecked={false}
          />
          <label className="check-field__label" htmlFor="userAgree">
            I agree to the terms and conditions.
          </label>
          {errors.userAgree && <p className="agree__error">{`${errors?.userAgree?.message}`}</p>}
        </div>

        <div className="switch-field">
          <label className="switch">
            <input type="checkbox" {...register('userPromo')} />
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
