import React, { useEffect, useState } from 'react';
import hotBanner from '../../assets/images/hot_banner.jpg';
import '../../styles/components/home/hot-list.scss';
import { NewMusicItem } from './newMusicItem';
import { apiHotSongs } from '../../service/apiStore/music';

export const HotList = () => {
  useEffect(() => {
    getHotSongsList();
  }, []);

  const [hotSongList, setHotSongList] = useState([]);

  // todo 请求热歌榜
  const getHotSongsList = async () => {
    const hotSongResponse = await apiHotSongs();
    setHotSongList( hotSongResponse.data.song_list );
    setTimeout(() => {
      console.log('hotSongList: ', hotSongList);
    }, 2000);
  }

  return (
    <div className="hot-list-container">
      <img className="hot-banner" src={ hotBanner } alt=""/>
      <div className="hot-list">
        {
          hotSongList && hotSongList.map(item => {
            return <NewMusicItem key={ item.artist_id + Math.random() } music={ item } />
          })
        }
      </div>
    </div>
  );
}