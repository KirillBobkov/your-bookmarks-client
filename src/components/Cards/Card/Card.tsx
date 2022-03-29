import React, {
  useState, useRef, MouseEvent, RefObject, useEffect,
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { MdSettings, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { deleteCard, addToFavorite } from '../../../state/cards/actions';
import { setEditModeAction, setCurrentId } from '../../../state/editMode/actions';

import { ICard } from '../../../interfaces/ICard';

import './Card.scss';

interface Props {
  card: ICard;
}

const Card = ({ card }: Props): JSX.Element => {
  const imagePlaceholder = 'https://via.placeholder.com/300x150/f0f0f0/858585?text=Image+not+found';
  const linkFavicon = `https://icons.duckduckgo.com/ip3/www.${card.link}.ico`;

  const dispatch = useDispatch();
  const [image, setImage] = useState(imagePlaceholder);
  const [editOptionsEnabled, setEditOptions] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>();

  useEffect((): void => {
    // axios.get(`http://api.linkpreview.net/?key=118bc20e3e8c646bbdf115ef91deccfe&q=https://${card.link}`)
    //   .then(res => { setImage(res.data.image); });
  }, []);
  
  const handleAddToFavorite = (e: MouseEvent): void => {
    e.stopPropagation();
    dispatch(addToFavorite(card._id));
  };

  const handleDeleteCard = (e: MouseEvent): void => {
    e.stopPropagation();
    dispatch(deleteCard(card._id));
  };

  const handleSetEditMode = (e: MouseEvent): void => {
    e.stopPropagation();
    dispatch(setEditModeAction(true));
    dispatch(setCurrentId(card._id));
  };

  const handleSetEditOptions = (e: MouseEvent): void => {
    e.stopPropagation();
    setEditOptions(!editOptionsEnabled); 
  };

  const handleLinkClick = (e: MouseEvent): void => {
    e.preventDefault();
    if (linkRef && linkRef.current) {
      linkRef.current.click(); 
    }
  };

  return (
    <li>
      <a
        ref={linkRef as RefObject<HTMLAnchorElement>}
        href={card.link}
        rel="noreferrer"
        target="_blank"
        style={{ display: 'none' }}
      >
        {' '}
      </a>
      <div className="card" style={{ background: `center / cover no-repeat url('${image}')` }} onClick={handleLinkClick}>
        <div className="card__content">
          <MdSettings className="card__edit-toogle" onClick={handleSetEditOptions} />
          {editOptionsEnabled 
          && (
            <div className="card__edit-options" onMouseLeave={handleSetEditOptions}>
              <div className="card__edit-button" onClick={handleSetEditMode}>
                <AiFillEdit />
                <span className="card__edit-text">Edit</span>
              </div>
              <div className="card__edit-button" onClick={handleDeleteCard}>
                <AiFillDelete size="16" />
                <span className="card__edit-text">Delete</span>
              </div>
            </div>
          )}
          {card.isFavorite 
            ? (
              <MdFavorite
                size="20"
                className={`card__favorite ${card.isFavorite ? 'card__favorite--red' : ''}`}
                onClick={handleAddToFavorite}
              />
            )
            : (
              <MdFavoriteBorder 
                size="20"
                className="card__favorite"
                onClick={handleAddToFavorite}
              />
            )}
        </div>
      </div>
      <h2 className="card__title"> 
        <img 
          className="card__favicon" 
          width="16" 
          height="16" 
          src={linkFavicon} 
          alt={`${card.title} link icon`}
        /> 
        {' '}
        {card.title}
      </h2>
    </li>
  );
};

export default React.memo(Card);
