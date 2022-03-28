
import React, { ComponentType, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isFetchingCardsSelector } from '../state/cards/selectors';
import { getCards } from '../state/cards/actions';

import Loader from '../components/Loader';

const withCards = (WrappedComponent: ComponentType<any>): ComponentType<any> => {
  const withCardsComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const isFetching = useSelector(isFetchingCardsSelector);
      
    useEffect((): void => { dispatch(getCards()); }, []);
      
    return isFetching ? <Loader /> : <WrappedComponent />;
  };

  withCardsComponent.displayName = `withCardsComponent(${WrappedComponent.name})`;

  return withCardsComponent;
};

export default withCards;
