import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchFilter, setSearchValue } from '../../state/search/actions';
import { isCardsEmptySelector } from '../../state/cards/selectors';
import { getSearchValueSelector, getSearchFilterSelector } from '../../state/search/selectors';

import useDebounce from '../../hooks/useDebounce';

import Input from '../Input';
import Toggle from '../Toggle';

import './Header.scss';

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValueSelector);
  const isCardsAvailable = useSelector(isCardsEmptySelector);
  const isFavoriteShown = useSelector(getSearchFilterSelector);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect((): void => {
    dispatch(setSearchValue(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const handleToggleFilter = useCallback((flag: boolean): void => {
    dispatch(setSearchFilter(flag));
  }, [dispatch]);

  return (
    <header className="header">
      <Toggle classes="header__toggle" checked={isFavoriteShown} onToggle={handleToggleFilter} />
      <Input 
        name="Find bookmark" 
        classes="header__input"
        onChange={setSearchTerm}
        value={searchTerm}
        isDisabled={!isCardsAvailable}
      />
    </header>
  );
};

export default Header;
