import React from 'react';
import { ICard } from 'types';
import './Player.css';

type PropsPlayerType = {
  onSubmit: (cardData: ICard) => void;
};

type ErrorsType = {
  nameError: boolean;
  dateError: boolean;
  countryError: boolean;
  agreeError: boolean;
};

type StatePlayerType = {
  url: string;
  errors: ErrorsType;
  submitSuccess: boolean;
};

export class PlayerForm extends React.Component<PropsPlayerType, StatePlayerType> {
  private checkRef: React.RefObject<HTMLInputElement>;
  constructor(props: PropsPlayerType) {
    super(props);
    this.state = {
      url: '',
      errors: {
        nameError: false,
        dateError: false,
        countryError: false,
        agreeError: false,
      },
      submitSuccess: false,
    };
    this.checkRef = React.createRef();
  }

  handleChangeFile(file: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem('avatar', reader.result as string);
      this.setState({ ...this.state, url: reader.result as string });
    };
  }

  get hasErrors() {
    return Object.values(this.state.errors).some((er) => er);
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const cardData = this.validation(form);
    console.log('cardData', cardData);

    if (cardData) {
      this.props.onSubmit(cardData);
      this.setState({ ...this.state, submitSuccess: true });
      setTimeout(this.reset, 2000, form);
    }

    console.log('isSeccess', this.state.submitSuccess);
  }

  validation = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const userName = formData.get('userName') as string;
    const userDate = formData.get('userDate') as string;
    const userCountry = formData.get('userCountry') as string;
    const userAgree = formData.get('userAgree');
    const userPromo = formData.get('userPromo');

    const errors: Partial<ErrorsType> = {};

    if (!userName) {
      errors.nameError = true;
    }
    if (!userDate) {
      errors.dateError = true;
    }
    if (!userCountry) {
      errors.countryError = true;
    }
    if (!userAgree) {
      errors.agreeError = true;
    }

    if (Object.entries(errors).length) {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, ...errors },
      });
      return;
    }

    return {
      id: Math.random(),
      url: this.state.url || '',
      name: userName,
      date: userDate,
      country: userCountry,
      isAgreeTerms: !!userAgree,
      isAgreePromo: !!userPromo,
    };
  };

  reset = (form: HTMLFormElement) => {
    form.reset();
    localStorage.removeItem('avatar');
    this.setState({
      ...this.state,
      url: '',
      errors: {
        nameError: false,
        dateError: false,
        countryError: false,
        agreeError: false,
      },
      submitSuccess: false,
    });

    if (this.checkRef.current !== null) {
      this.checkRef.current.checked = false;
    }
  };

  render() {
    return (
      <>
        {this.state.submitSuccess && (
          <div className="submit-success">Your data has been successfully saved!</div>
        )}
        <form
          className="form"
          onSubmit={this.onSubmit.bind(this)}
          id="form-player"
          onChange={(e) => {
            console.log('form change', e);
          }}
        >
          <div className="avatar-field">
            <div className="avatar-img">
              {this.state.url && (
                <img className="avatar-img__uploaded" width={90} height={90} src={this.state.url} />
              )}
            </div>
            <input
              className="avatar-field__input"
              type="file"
              accept=".jpg, .jpeg, .png"
              id="file"
              onChange={(e) => {
                if (!e.target.files) return;
                this.handleChangeFile(e.target.files[0]);
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
              className={`text-field__input ${
                this.state.errors.nameError ? 'form__input_error' : ''
              }`}
              type="text"
              id="userName"
              name="userName"
              placeholder="User Name"
              onChange={() => {
                if (this.state.errors.nameError) {
                  this.setState({
                    ...this.state,
                    errors: { ...this.state.errors, nameError: false },
                  });
                }
              }}
            />
            {this.state.errors.nameError && <p className="form__error">Please, enter your name!</p>}
          </div>

          <div className="date-field">
            <label className="text-field__label" htmlFor="date">
              Date of Birth
            </label>
            <input
              className={`text-field__input ${
                this.state.errors.dateError ? 'form__input_error' : ''
              }`}
              type="date"
              id="date"
              name="userDate"
              onChange={() => {
                this.setState({
                  ...this.state,
                  errors: { ...this.state.errors, dateError: false },
                });
              }}
            />
            {this.state.errors.dateError && (
              <p className="form__error">Please, enter your date of birth!</p>
            )}
          </div>

          <div className="select-field">
            <p className="select__label">Countries</p>
            <select
              className={`select ${this.state.errors.countryError ? 'form__input_error' : ''} `}
              name="userCountry"
              defaultValue={''}
              onChange={() => {
                this.setState({
                  ...this.state,
                  errors: { ...this.state.errors, countryError: false },
                });
              }}
            >
              <option value="" disabled className="select__placeholder">
                Select your option
              </option>
              <option value="Ukraine">Ukraine</option>
              <option value="Poland">Poland</option>
              <option value="France">France</option>
              <option value="USA">USA</option>
            </select>
            {this.state.errors.countryError && (
              <p className="form__error">Please, choose your country!</p>
            )}
          </div>

          <div className="check-field">
            <input
              className="check-field__input"
              type="checkbox"
              id="userAgree"
              ref={this.checkRef}
              name="userAgree"
              defaultChecked={false}
              onChange={() => {
                console.log('change');

                this.setState({
                  ...this.state,
                  errors: { ...this.state.errors, agreeError: false },
                });
              }}
            />
            <label className="check-field__label" htmlFor="userAgree">
              I agree to the terms and conditions.
            </label>
            {this.state.errors.agreeError && (
              <p className="agree__error">You must agree with the rules!</p>
            )}
          </div>

          <div className="switch-field">
            <label className="switch">
              <input type="checkbox" name="userPromo" />
              <span className="slider round"></span>
            </label>
            <p className="switch-field__text">I want to receive notifications about promo</p>
          </div>

          <input className="submit-btn" type="submit" value="Create" disabled={this.hasErrors} />
        </form>
      </>
    );
  }
}
