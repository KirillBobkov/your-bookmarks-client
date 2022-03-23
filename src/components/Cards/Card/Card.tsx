import React, {
 useState, useRef, MouseEvent, RefObject, 
} from 'react';
import { useDispatch } from 'react-redux';
import { MdSettings, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { deleteCard, addToFavorite } from '../../../state/cards/actions';
import { setEditModeAction, setCurrentId } from '../../../state/editMode/actions';
import ICard from '../../../interfaces/ICard';

import './Card.scss';

const Card = ({ card }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [editOptionsEnabled, setEditOptions] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>();
  const linkFavicon = `https://icons.duckduckgo.com/ip3/www.${card.link}.ico`;
  const linkHref = `https://${card.link}`;
  
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
        href={linkHref}
        rel="noreferrer"
        target="_blank"
        style={{ display: 'none' }}
      >
        {' '}
      </a>
      <div className="card" onClick={handleLinkClick}>
        <MdSettings 
          className="card__edit-toogle" 
          onClick={(e: MouseEvent): void => handleSetEditOptions(e)}
        />
        {editOptionsEnabled 
          && (
          <div 
            className="card__edit-options" 
            onMouseLeave={(e): void => handleSetEditOptions(e)}
          >
            <div
              className="card__edit-button"
              onClick={(e: MouseEvent): void => handleSetEditMode(e)}
            >
              <AiFillEdit />
              <span className="card__edit-text">Edit</span>
            </div>
            <div
              className="card__edit-button"
              onClick={(e: MouseEvent): void => handleDeleteCard(e)}
            >
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
              onClick={(e: MouseEvent): void => handleAddToFavorite(e)}
            />
            )
          : (
            <MdFavoriteBorder 
              size="20"
              className="card__favorite"
              onClick={(e: MouseEvent): void => handleAddToFavorite(e)}
            />
          )}
       
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
      </div>
    </li>
  );
};

interface Props {
  card: ICard;
}

export default React.memo(Card);
