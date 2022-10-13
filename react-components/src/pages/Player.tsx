import React from 'react';
// import { NavLink } from 'react-router-dom';
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

export class Player extends React.Component {
  state = {
    url: '',
  };
  handleChangeFile(file: Blob) {
    const reader = new FileReader();
    let fileImg;
    reader.onload = () => {
      fileImg = reader.result;
      localStorage.setItem('avatar', fileImg as string);
      this.setState({ url: reader.result });
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <>
        <form className="form">
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
              id="UserName"
              placeholder="User Name"
            />
          </div>

          <div className="date-field">
            <label className="text-field__label" htmlFor="date">
              Date of Birth
            </label>
            <input className="text-field__input" type="date" id="date" />
          </div>

          <div className="select-field">
            <p className="select__label">Countries</p>
            <select className="select">
              <option value="Ukraine">Ukraine</option>
              <option value="Poland">Poland</option>
              <option value="France">France</option>
              <option value="USA">USA</option>
            </select>
          </div>

          <div className="check-field">
            <input className="check-field__input" type="checkbox" id="UserName" />
            <label className="text-field__label" htmlFor="UserName">
              I agree to the terms and conditions.
            </label>
          </div>

          {/* <label>
          I consent to my personal data
          <input type="checkbox" />
        </label> */}

          {/* <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label> */}

          <div className="switch-field">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <input className="submit-btn" type="submit" value="Отправить" />
        </form>
      </>
    );
  }
}
