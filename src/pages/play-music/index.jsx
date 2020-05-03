import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import '../../styles/components/play-music/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { apiSongInfo, apiLRC, apiPlaySource } from '../../service/apiStore/music';
import { time2Seconds } from '../../utils/index';

let audio = null,
    cleanedLrcIndex = 0,
    outerLrc = null;

export const PlayMusic = (props) => {
  const history = useHistory();
  const songId = history.location.state.songId;
  const [songInfo, setSongInfo] = useState(null);
  const [cleanedLrc, setCleanedLrc] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [syncCleanLrcIndex, setSyncCleanLrcIndex] = useState(0);
  const lrcEl = useRef(null);

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

    // -- 1.处理歌词为二维数组，[ ['时间', '歌词'] ]
    let lrcArr = lrcContent.replace(/\[/g, '').split('\n');
    let lrcSection = [];
    const reg = /\d+:\d+\.\d+/;
    for (let value of lrcArr) {
      let [time, text] = value.split(']');
      if (!reg.test( time )) continue;
      lrcSection.push( [ time, text ] );
    }

    // -- 2.将时间转换为秒
    for (let i = 0; i < lrcSection.length; i++) {
      lrcSection[i][0] = time2Seconds( lrcSection[i][0] );
    }
    
    // -- 3.将相同时间不为空的内容放到一个数组中
    let cleanedLrc = [], i = 0, len = lrcSection.length;
    const emptyReg = /^\s*$/;
    while (i < len) {
      let curr = lrcSection[i];
      if (emptyReg.test( curr[1] )) {
        i++;
        continue;
      }
      
      if (cleanedLrc.length > 0 &&
        curr[0] === cleanedLrc[cleanedLrc.length - 1][0]) {
          cleanedLrc[cleanedLrc.length - 1][1] += ` ${curr[1]}`;
      } else {
        cleanedLrc.push( [...curr] );
      }

      i++;
    }

    setCleanedLrc( cleanedLrc );
    outerLrc = cleanedLrc;
  }

  // todo 计算歌词的滚动高度
  const calculateScrollHeight = (current) => {
    if (outerLrc[ cleanedLrcIndex + 1 ] === undefined) return ;
    if (current >= outerLrc[ cleanedLrcIndex + 1 ][0]) {
      setSyncCleanLrcIndex( cleanedLrcIndex + 1 );
      cleanedLrcIndex += 1;
      lrcEl.current.scrollTop += 30;
    }
  }

  // todo 初始化歌曲并监听 timeupdate、ended 事件
  const initAudio = async () => {
    audio = new Audio();
    window.audio = audio;
    // 这里需要调用播放音乐的接口
    const playSourceResponse = await apiPlaySource({ songId });
    console.log('playSourceResponse: ', playSourceResponse);
    let playSource = playSourceResponse.data.bitrate.file_link;
    audio.src = playSource;

    audio.addEventListener('timeupdate', (e) => {
      let current = e.path[0].currentTime;
      setCurrentTime( current );
      calculateScrollHeight( current );
    });

    audio.addEventListener('ended', (e) => {
      pauseAudio();
      lrcEl.current.scrollTop = 0;
      cleanedLrcIndex = 0;
      setSyncCleanLrcIndex(0);
    });
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

      <div className="lrc" ref={ lrcEl }>
        {
          cleanedLrc && cleanedLrc.map((item, index) => {
            return <div className={ classnames({ "playing": index === syncCleanLrcIndex, "lrc-row": true, "f-c": true }) }  key={ item[0] }>
              { item[1] }
            </div>
          })
        }
      </div>
    </div>
  );
}