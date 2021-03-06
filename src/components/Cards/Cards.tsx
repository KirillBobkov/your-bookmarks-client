import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPlus } from 'react-icons/bs';

import Card from './Card';
import { setEditModeAction } from '../../state/editMode/actions';
import { getCardsSelector } from '../../state/cards/selectors';
import { getSearchValueSelector } from '../../state/search/selectors';
import ICard from '../../interfaces/ICard';
import withCards from '../../hocs/withCards';

import './Cards.scss';

const Cards = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector(getCardsSelector);
  const searchValue = useSelector(getSearchValueSelector);
  const [filteredCards, setFilteredCards] = useState<ICard[]>(cards);

  useEffect((): void => {
    const filteredCardsToState = cards
      .filter((card: ICard): boolean => card.title
        .toLowerCase()
        .includes(searchValue.toLowerCase()));

    setFilteredCards(filteredCardsToState);
  }, [cards, searchValue]);

  return (
    <div className="cards">
      <ul className="cards__container">
        {filteredCards && !!filteredCards.length
          && (
          <>
            {filteredCards.map((card: ICard): JSX.Element => (
              <Card 
                key={card._id} 
                card={card}
              />
            ))}
          </>
        )
      }
        {!!cards.length && !filteredCards.length && <div>Sorry, no cards have found</div>}
        {!searchValue && (
        <li className="cards__add-button" onClick={(): void => { dispatch(setEditModeAction(true)); }}>
          <BsPlus color="white" size="50" />
        </li>
      )}
      </ul> 
    </div>
  );
};

export default withCards(Cards);
