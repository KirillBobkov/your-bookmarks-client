import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import _ from 'lodash';

import { setEditModeAction, setCurrentId } from '../../state/editMode/actions';
import { createCard, updateCard } from '../../state/cards/actions';
import { getIsActiveEditModeSelector, getCurrentIdSelector } from '../../state/editMode/selectors';
import { getCurrentIdCardSelector } from '../../state/cards/selectors';

import Button from '../Button';
import Input from '../Input';

import { IPartialCard } from '../../interfaces/ICard';
import validateField from '../../helpers/validation';

import './Form.scss';

Modal.setAppElement('#root');

const Form = (): JSX.Element => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(getIsActiveEditModeSelector);
  const currentId = useSelector(getCurrentIdSelector);
  const currentCard = useSelector(getCurrentIdCardSelector);

  const initialErrorsState: IPartialCard = { previewSrc: '', title: '', link: '' };
  const initialCardState: IPartialCard = { previewSrc: '', title: '', link: '' };
  const [errors, setValidationErrors] = useState(initialErrorsState);
  const [cardData, setCardData] = useState<IPartialCard>(initialCardState);

  useEffect((): void => { 
    if (currentCard) setCardData(currentCard); 
  }, [currentCard]);

  const handleClearFields = (): void => {
    setCardData(initialCardState);
    setValidationErrors(initialErrorsState);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const errorsData = validateField(
      { previewSrc: cardData.previewSrc, title: cardData.title, link: cardData.link },
    );

    if (!_.isEqual(errorsData, initialErrorsState)) {
      setValidationErrors(errorsData);
      return;
    } 

    dispatch(currentId 
      ? updateCard(currentId, cardData) 
      : createCard(cardData));
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

  const handleOnChangePreviewSrc = (value: string): void => {
    setValidationErrors({ ...errors, previewSrc: '' });
    setCardData({
      ...cardData,
      previewSrc: value,
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
      overlayClassName="popup-overlay"
      className="popup-form"
      shouldCloseOnOverlayClick
      closeTimeoutMS={300}
      onRequestClose={handleCloseForm}
    >
      <GrClose className="popup-form__close-button" onClick={handleCloseForm} />
      <h2 className="popup-form__title">{currentId ? 'Edit bookmark' : 'Create a bookmark'}</h2>
      <p className="popup-form__description">
        {currentId 
          ? 'Change text area that you need and submit changes'
          : 'Fill all text areas to create and add a new bookmark'}
      </p>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Input
          label="Title"
          name="Title"
          placeholder="Type title of the card here"
          errorMessage={errors.title}  
          value={cardData.title} 
          onChange={handleOnChangeTitle}
        />
        <Input
          label="Link"
          name="Link"
          placeholder="Type or paste link here"
          errorMessage={errors.link}  
          value={cardData.link} 
          onChange={handleOnChangeLink}
        />
        <Input
          label="Preview source image"
          name="Preview source image"
          placeholder="Type or paste preview source here"
          errorMessage={errors.previewSrc}  
          value={cardData.previewSrc} 
          onChange={handleOnChangePreviewSrc}
        />
        <div className="popup-form__actions">
          <Button text="Clear" mode="danger" onClick={handleClearFields} />
          <Button text={currentId ? 'Update' : 'Save'} mode="save" onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

export default Form;
