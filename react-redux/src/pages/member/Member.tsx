import React from 'react';
import { MemberCard } from './MemberCard';
import { MemberForm } from './MemberForm';
import { ICardType } from 'types';
import './Member.css';
import { useAppSelector } from 'hooks/redux';

export function Member() {
  const { cards } = useAppSelector((state) => state.formReducer);

  return (
    <>
      <div>
        <MemberForm />
        <div className="member-cards">
          {cards.map((card: ICardType) => (
            <MemberCard key={card.id.toString()} cardData={card} />
          ))}
        </div>
      </div>
    </>
  );
}
