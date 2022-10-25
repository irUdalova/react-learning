import React from 'react';
import { PlayerCard } from './PlayerCard';
import { PlayerForm } from './PlayerForm';
import './Player.css';
import { ICard } from 'types';

type PropsPlayerType = Record<string, unknown>;

type StatePlayerType = {
  cards: ICard[];
};

export class Player extends React.Component<PropsPlayerType, StatePlayerType> {
  constructor(props: PropsPlayerType) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  render() {
    return (
      <>
        <div>
          <PlayerForm
            onSubmit={(card: ICard) => {
              this.setState({ ...this.state, cards: [...this.state.cards, card] });
            }}
          />
          <div className="player-cards">
            {this.state.cards.map((card) => (
              <PlayerCard key={card.id.toString()} cardData={card} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
