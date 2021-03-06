import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/components/home/newMusicItem.scss';
import '../../styles/common/flex.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faHSquare } from '@fortawesome/free-solid-svg-icons';

export const NewMusicItem = (props) => {
  const { music } = props;
  const history = useHistory();

  const clickMusic = () => {
    history.push({
      pathname: 'play-music',
      state: {
        songId: props.music.song_id
      }
    })
  }

  return (
    <div onClick={ clickMusic } className="new-music-item-container">
      <div className="content-box">
        <div className="content f-row-between-c">
          <div className="title f-col-between">
            <p className="sup">{ music.album_title }</p>
            <p className="sub f-i-c">
              <FontAwesomeIcon className="hot" icon={faHSquare} />
              { music.author } - { music.title }
            </p>
          </div>
          <FontAwesomeIcon className="logo" icon={faPlayCircle} />
        </div>
      </div>
    </div>
  );
}