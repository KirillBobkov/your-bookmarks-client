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
  const [theme, setTheme] = useState('light');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect((): void => {
    const body = document.getElementsByTagName('body')[0];

    if (theme === 'dark') {
      body.classList.remove('light');
      body.classList.add('dark');
    }

    if (theme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }, [theme]);

  useEffect((): void => {
    dispatch(setSearchValue(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const handleToggleFilter = useCallback((flag: boolean): void => {
    dispatch(setSearchFilter(flag));
  }, [dispatch]);

  const handleToggleTheme = useCallback((flag: boolean): void => {
    setTheme(flag ? 'dark' : 'light' );
  }, [dispatch]);

  return (
    <header className="header">
      <Toggle label={'Favorite'} classes="header__toggle" checked={isFavoriteShown} onToggle={handleToggleFilter} />
      <Toggle label={'Dark mode'} classes="header__toggle" checked={theme !== 'light'} onToggle={handleToggleTheme} />
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
