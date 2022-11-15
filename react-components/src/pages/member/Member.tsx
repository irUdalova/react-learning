import React from 'react';
import { MemberCard } from './MemberCard';
import { MemberForm } from './MemberForm';
import { CardType } from 'types';
import './Member.css';

type PropsMemberType = Record<string, unknown>;

type StateMemberType = {
  cards: CardType[];
};

export class Member extends React.Component<PropsMemberType, StateMemberType> {
  constructor(props: PropsMemberType) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  render() {
    return (
      <>
        <div>
          <MemberForm
            onSubmit={(card: CardType) => {
              this.setState({ ...this.state, cards: [...this.state.cards, card] });
            }}
          />
          <div className="member-cards">
            {this.state.cards.map((card) => (
              <MemberCard key={card.id.toString()} cardData={card} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
