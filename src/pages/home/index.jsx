import React, { useEffect, useState } from 'react';
import '../../styles/pages/home/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { TopTab } from '../../components/home/top-tab';
import { ListTitle } from '../../components/home/list-title';
import { NewMusicItem } from '../../components/home/newMusicItem';
import { RecommendList } from '../../components/home/recommend-list';
import { apiRecommendList, apiNewSongs } from '../../service/apiStore/music';

export const HomePage = () => {
  const [musicList, setMusicList] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  
  // todo 根据子组件的 activeIndex 更改路由
  const changeRouteByTabActiveIndex = (index) => {
    console.log( '父组件接到变化了', index );
  }

  // todo 请求推荐歌曲
  const getRecommendList = async () => {
    const recommendListResponse = await apiRecommendList();
    setMusicList( recommendListResponse.data.song_list );
  }

  // todo 请求新歌榜数据
  const getNewSongList = async () => {
    const newSongResponse = await apiRecommendList();
    console.log('新歌榜: ', newSongResponse);
    setNewSongs( newSongResponse.data.song_list );
  }
  
  useEffect(() => {
    getRecommendList();
    getNewSongList();
  }, [])

  return (
    <div className="home-container">
      {/* 顶部logo */}
      <div className="top-logo f-i-c">
        <FontAwesomeIcon className="logo" icon={faMusic} />
        <p className="title">网易云音乐</p>
        <div className="download flx">
          <div className="f-c">下载app</div>
        </div>
      </div>
      <div className="empty-div-1" />

      {/* 顶部tab */}
      <div className="top-tab-cmpt">
        <TopTab changeRouteByTabActiveIndex={changeRouteByTabActiveIndex} />
      </div>

      {/* 推荐歌曲组件 */}
      <div className="recommend-list-cmpt">
        <RecommendList musicList={musicList} />
      </div>

      {/* 最新音乐 */}
      <div className="new-music-area">
        <ListTitle title="最新音乐" />
        {
          newSongs && newSongs.map(item => {
            return <NewMusicItem key={item.song_id} music={ item } />
          })
        }
      </div>
    </div>
  );
}