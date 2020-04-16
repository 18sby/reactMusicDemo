import React from 'react';
import '../../styles/components/home/recommend-item.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

export const RecommendItem = (props) => {
  const { music } = props;
  return (
    <div className="recommend-item-container">
      <img src={ music.pic_big } alt=""/>
      <p>{ music.title }</p>
      <div className="hear">
        <FontAwesomeIcon className="logo" icon={faHeadphones} />
        <span>{ music.hot }</span>
      </div>
    </div>
  );
}