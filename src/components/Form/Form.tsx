import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import _ from 'lodash';

import editFormStyles from './settingsEditForm';
import { setEditModeAction, setCurrentId } from '../../state/editMode/actions';
import { createCard, updateCard } from '../../state/cards/actions';
import Button from '../Button';
import Input from '../Input';
import validateField from '../../helpers/validation';

import './Form.scss';
import ICard from '../../interfaces/ICard';
import { getIsActiveEditModeSelector, getCurrentIdSelector } from '../../state/editMode/selectors';
import { getCurrentIdCardSelector } from '../../state/cards/selectors';

Modal.setAppElement('#root');

const Form = (): JSX.Element => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(getIsActiveEditModeSelector);
  const currentId = useSelector(getCurrentIdSelector);
  const currentCard = useSelector(getCurrentIdCardSelector);

  const initialErrorsState = { title: '', link: '' };
  const initialCardState = { title: '', link: '' };
  const [errors, setValidationErrors] = useState(initialErrorsState);
  const [cardData, setCardData] = useState(initialCardState);

  useEffect((): void => { 
    if (currentCard) setCardData(currentCard); 
  }, [currentCard]);

  const handleClearFields = (): void => {
    setCardData(initialCardState);
    setValidationErrors(initialErrorsState);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    const errorsData = validateField(cardData);

    if (!_.isEqual(errorsData, initialErrorsState)) {
      setValidationErrors(errorsData);
      return;
    } 

    dispatch(currentId 
      ? updateCard(currentId, cardData) 
      : createCard(cardData as Partial<ICard>));
    dispatch(setEditModeAction(false));
    dispatch(setCurrentId(''));
    handleClearFields();
  };

  const handleOnChangeTitle = (value: string): void => {
    setValidationErrors({ ...errors, title: '' });
    setCardData({
      ...cardData,
      title: value,
    });
  };

  const handleOnChangeLink = (value: string): void => {
    setValidationErrors({ ...errors, link: '' });
    setCardData({
      ...cardData,
      link: value,
    });
  };

  const handleCloseForm = (): void => {
    dispatch(setEditModeAction(false)); 
    dispatch(setCurrentId(''));
    handleClearFields();
  };

  return (
    <Modal
      isOpen={isEditMode}
      style={editFormStyles as Modal.Styles}
    >
      <div className="edit-window">
        <GrClose
          className="edit-window__button"
          onClick={handleCloseForm}
        />
        <h2 className="edit-window__title">
          {currentId ? 'Edit bookmark' : 'Create a bookmark'}
        </h2>
        <p className="edit-window__description">
          {currentId 
            ? 'Change text area that you need and submit changes'
            : 'Fill all text areas to create and add a new bookmark'}
        </p>
        <form
          autoComplete="off"
          noValidate
          onSubmit={(e): void => handleSubmit(e)}
        >
          <Input
            label="Title"
            name="Title"
            errorMessage={errors.title}  
            value={cardData.title} 
            onChange={handleOnChangeTitle}
          />
          <Input
            label="Link"
            name="Link"
            errorMessage={errors.link}  
            value={cardData.link} 
            onChange={handleOnChangeLink}
          />
          <div className="edit-window__actions">
            <Button capture="Submit" onClick={(e): void => handleSubmit(e)} />
            <Button capture="Clear" mode="danger" onClick={handleClearFields} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Form;
