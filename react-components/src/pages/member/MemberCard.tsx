import React from 'react';
import { CardType } from 'types';
import './Member.css';

type CardsValues = {
  cardData: CardType;
};

export class MemberCard extends React.Component<CardsValues> {
  render() {
    const { url, name, date, country, isAgreeTerms, isAgreePromo } = this.props.cardData;
    return (
      <>
        <div className="member-card">
          <div className="avatar-img">
            <img
              className="avatar-img__uploaded"
              width={90}
              height={90}
              src={url || 'assets/svg/user.svg'}
            />
          </div>

          <div className="name">{name || 'Unknown'}</div>

          <div className="date">{date || 'Unknown'}</div>

          <div className="country">{country}</div>

          <div className="terms">
            {isAgreeTerms
              ? 'I agree to the terms and conditions'
              : "I don't agree to the terms and conditions"}
          </div>

          <div className="promo">
            {isAgreePromo
              ? ' I want to receive notifications about promo'
              : 'I want to receive notifications about promo'}
          </div>
        </div>
      </>
    );
  }
}
