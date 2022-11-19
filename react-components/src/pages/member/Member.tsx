import React, { useState } from 'react';
import { MemberCard } from './MemberCard';
import { MemberForm } from './MemberForm';
import { CardType } from 'types';
import './Member.css';

export function Member() {
  const [cards, setCards] = useState<CardType[]>([]);

  return (
    <>
      <div>
        <MemberForm
          onSubmitForm={(card: CardType) => {
            setCards([...cards, card]);
          }}
        />
        <div className="member-cards">
          {cards.map((card) => (
            <MemberCard key={card.id.toString()} cardData={card} />
          ))}
        </div>
      </div>
    </>
  );
}
