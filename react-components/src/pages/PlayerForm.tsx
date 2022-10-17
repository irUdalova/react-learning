import React from 'react';
import { ICard } from 'types';
import './Player.css';

// const COUNTRIES = [
//   {
//     id: 'ua',
//     value: 'Ukraine',
//     title: 'Ukraine',
//   },
//   {
//     id: 'pl',
//     value: 'Poland',
//     title: 'Poland',
//   },
//   {
//     id: 'fr',
//     value: 'France',
//     title: 'France',
//   },
//   {
//     id: 'fr',
//     value: 'France',
//     title: 'France',
//   },
// ];

type PropsPlayerType = {
  onSubmit: (cardData: ICard) => void;
};

type StatePlayerType = {
  url: string;
};

export class PlayerForm extends React.Component<PropsPlayerType, StatePlayerType> {
  constructor(props: PropsPlayerType) {
    super(props);
    this.state = { url: '' };
  }

  handleChangeFile(file: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      localStorage.setItem('avatar', reader.result as string);
      this.setState({ url: reader.result as string });
    };
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log('this onSubmit', this);

    const formData = new FormData(event.target as HTMLFormElement);
    const cardData = {
      id: Math.random(),
      url: this.state.url || '',
      name: formData.get('userName') as string,
      date: formData.get('userDate') as string,
      country: formData.get('userCountry') as string,
      isAgreeTerms: !!formData.get('userAgree'),
      isAgreePromo: !!formData.get('userPromo'),
    };

    this.props.onSubmit(cardData);
  }

  render() {
    return (
      <>
        <form className="form" onSubmit={this.onSubmit.bind(this)} id="form-player">
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
              className="text-field__input"
              type="text"
              id="userName"
              name="userName"
              placeholder="User Name"
            />
          </div>

          <div className="date-field">
            <label className="text-field__label" htmlFor="date">
              Date of Birth
            </label>
            <input className="text-field__input" type="date" id="date" name="userDate" />
          </div>

          <div className="select-field">
            <p className="select__label">Countries</p>
            <select className="select" name="userCountry">
              <option value="Ukraine">Ukraine</option>
              <option value="Poland">Poland</option>
              <option value="France">France</option>
              <option value="USA">USA</option>
            </select>
          </div>

          <div className="check-field">
            <input className="check-field__input" type="checkbox" id="userAgree" name="userAgree" />
            <label className="text-field__label" htmlFor="userAgree">
              I agree to the terms and conditions.
            </label>
          </div>

          <div className="switch-field">
            <label className="switch">
              <input type="checkbox" name="userPromo" />
              <span className="slider round"></span>
            </label>
            <p className="switch-field__text">I want to receive notifications about promo</p>
          </div>

          <input className="submit-btn" type="submit" value="Отправить" />
        </form>
      </>
    );
  }
}
