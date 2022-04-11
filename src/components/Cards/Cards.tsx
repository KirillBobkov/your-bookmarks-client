import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { BsPlus } from 'react-icons/bs';

import Card from './Card';

import { setEditModeAction } from '../../state/editMode/actions';
import { getCardsSelector } from '../../state/cards/selectors';
import { getSearchFilterSelector, getSearchValueSelector } from '../../state/search/selectors';

import { ICard } from '../../interfaces/ICard';

import withCards from '../../hocs/withCards';

import './Cards.scss';

const Cards = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector(getCardsSelector);
  const searchValue = useSelector(getSearchValueSelector);
  const isFavoriteShown = useSelector(getSearchFilterSelector);
  const [cardsForRender, setCardsForRender] = useState<ICard[]>(cards);

  useEffect((): void => {
    const filterCards = (card: ICard): boolean => {
      const isMatchingByTitle = card.title.toLowerCase().includes(searchValue.toLowerCase());

      return isFavoriteShown 
        ? isMatchingByTitle && isFavoriteShown === card.isFavorite
        : isMatchingByTitle;
    };
  
    const filteredCards = _.filter(cards, filterCards);
    setCardsForRender(filteredCards);
  }, [cards, searchValue, isFavoriteShown]);

  const onAddButton = (): AnyAction => dispatch(setEditModeAction(true));

  return (
    <div className="cards">
      <ul className="cards__container">
        {cardsForRender?.length 
          ? (
            <>
              {cardsForRender
                .map((card: ICard): JSX.Element => <Card key={card._id} card={card} />)}
            </>
          )
          : <div>Sorry, no cards have found</div>}
        {!searchValue && (
          <li className="cards__add-button" onClick={onAddButton}>
            <BsPlus color="black" size="50" />
          </li>
        )}
      </ul> 
    </div>
  );
};

export default withCards(Cards);
