import React, {
  useState, useRef, MouseEvent, RefObject, useEffect, FocusEvent,
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
  const imagePlaceholderAPI = 'https://via.placeholder.com/300x150/f0f0f0/858585?text=Image+not+found';
  const previewImageAPI = 'https://api.linkpreview.net';

  const getlinkFavicon = (link: string): string => {
    const httpRegExp = /https:\/\/|http:\/\//gm;
    const clarifiedLink = link.replace(httpRegExp, '');
    return `https://icons.duckduckgo.com/ip3/www.${clarifiedLink}.ico`;
  };

  const dispatch = useDispatch();
  const [image, setImage] = useState(imagePlaceholderAPI);
  const [editOptionsEnabled, setEditOptions] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>();
  const optionsRef = useRef<HTMLDivElement>();
  const linkFavicon = getlinkFavicon(card.link);

  useEffect((): void => {
    const fetchPreviewImage = async (): Promise<any> => {
      const res = await axios.post(previewImageAPI, {
        q: card.link,
        key: '118bc20e3e8c646bbdf115ef91deccfe',
      });

      setImage(res.data.image);
    };
  
    fetchPreviewImage();
  }, [card.link]);
  
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

  const handleSetEditOptions = (
    e: FocusEvent | MouseEvent, optionsState: boolean,
  ): void => {
    e.stopPropagation();
    setEditOptions(optionsState); 
   
    if (optionsState) {
      setTimeout((): void => {
        optionsRef?.current?.focus();
      }, 0);
    }
  };

  const handleLinkClick = (e: MouseEvent): void => {
    e.preventDefault();
    linkRef?.current?.click();
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
          <MdSettings className="card__edit-toogle" onClick={(e): void => handleSetEditOptions(e, true)} />
          {editOptionsEnabled 
          && (
            <div 
              // eslint-disable-next-line
              tabIndex={2}
              className="card__edit-options" 
              ref={optionsRef as RefObject<HTMLDivElement>} 
              onBlur={(e): void => handleSetEditOptions(e as FocusEvent, false)} 
              onMouseLeave={(e): void => handleSetEditOptions(e as MouseEvent, false)}
            >
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
