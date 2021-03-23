import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../state/search/actions';
import { isCardsEmptySelector } from '../../state/cards/selectors';
import { getSearchValueSelector } from '../../state/search/selectors';
import useDebounce from '../../hooks/useDebounce';
import Input from '../Input';

import './Header.scss';

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValueSelector);
  const isCardsAvailable = useSelector(isCardsEmptySelector);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect((): void => {
      dispatch(setSearchValue(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <header className="header">
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
