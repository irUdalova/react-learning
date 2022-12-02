import React, { useContext } from 'react';
import { MemberCard } from './MemberCard';
import { MemberForm } from './MemberForm';
import { ICardType } from 'types';
import './Member.css';
import { AppStateContext } from 'App';

export function Member() {
  const { formPage: state } = useContext(AppStateContext);

  return (
    <>
      <div>
        <MemberForm />
        <div className="member-cards">
          {state.cards.map((card: ICardType) => (
            <MemberCard key={card.id.toString()} cardData={card} />
          ))}
        </div>
      </div>
    </>
  );
}
