import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import '../../styles/components/play-music/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { apiSongInfo, apiLRC, apiPlaySource } from '../../service/apiStore/music';

let audio = null;

export const PlayMusic = (props) => {
  const history = useHistory();
  const songId = history.location.state.songId;
  const [songInfo, setSongInfo] = useState(null);
  const [lrcInfo, setLrcInfo] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);

  // todo 获取歌曲信息
  const getSongInfo = async () => {
    const songResponse = await apiSongInfo({ songId });
    console.log('songResponse: ', songResponse.data.bitrate);
    setSongInfo( songResponse.data.songinfo );
    initAudio();
  }

  // todo 获取歌词
  const getLRC = async () => {
    const lrcResponse = await apiLRC({ songId });
    console.log('lrcResponse: ', lrcResponse);
    let lrcContent = lrcResponse.data.lrcContent;
    setLrcInfo( lrcContent );
  }

  // todo 初始化歌曲
  const initAudio = async () => {
    audio = new Audio();
    // 这里需要调用播放音乐的接口
    const playSourceResponse = await apiPlaySource({ songId });
    console.log('playSourceResponse: ', playSourceResponse);
    let playSource = playSourceResponse.data.bitrate.file_link;
    audio.src = playSource;
    window.audio = audio;
  }

  // todo 播放歌曲
  const playAudio = () => {
    try {
      audio.play();
    } catch (error) {
      console.log('play error: ', error);
    }
    setPlayStatus( true );
  }

  // todo 暂停歌曲
  const pauseAudio = () => {
    audio.pause();
    setPlayStatus( false );
  }

  // todo 切换播放状态
  const switchPlayStatus = () => {
    if (playStatus) {
      pauseAudio();
      return ;
    }
    playAudio();
  }

  useEffect(() => {
    getSongInfo();
    getLRC();
  }, [])

  return (
    <div className="play-music-container">
      <div className="logo-text">
        <span>网</span>
        <span>易</span>
        <span>云</span>
        <span>音</span>
        <span>乐</span>
      </div>

      {
        songInfo && <div onClick={ switchPlayStatus } className="cover f-c">
          <img className={ classnames({ 'running': playStatus }, { 'paused': !playStatus }) } src={ songInfo.pic_premium } alt=""/>
          {
            !playStatus && <FontAwesomeIcon className="logo" icon={faPlayCircle} />
          }
        </div>
      }

      <div className="lrc">
        { lrcInfo && lrcInfo }
      </div>
    </div>
  );
}