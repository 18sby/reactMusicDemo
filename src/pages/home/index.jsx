import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import '../../styles/pages/home/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { TopTab } from '../../components/home/top-tab';
import { ListTitle } from '../../components/home/list-title';
import { NewMusicItem } from '../../components/home/newMusicItem';
import { RecommendList } from '../../components/home/recommend-list';
import { HotList } from '../../components/home/hot-list';
import { Search } from '../../components/home/search';
import { apiRecommendList } from '../../service/apiStore/music';
import { PlayMusic } from '../play-music/index';

export const HomePage = () => {
  const history = useHistory();

  const [musicList, setMusicList] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  
  // todo 根据子组件的 activeIndex 更改路由 (注意：这里使用路由其实是不太合理的，这里是想试一下路由的函数跳转)
  const changeRouteByTabActiveIndex = (index) => {
    const homeRouteMap = {
      '0': '/',
      '1': '/hot',
      '2': '/search'
    }
    let targetPath = homeRouteMap[index];
    if (history.location.pathname === targetPath) return ;
    history.replace( targetPath );
  }

  // todo 请求推荐歌曲
  const getRecommendList = async () => {
    const recommendListResponse = await apiRecommendList();
    setMusicList( recommendListResponse.data.song_list );
  }

  // todo 请求新歌榜数据
  const getNewSongList = async () => {
    const newSongResponse = await apiRecommendList();
    setNewSongs( newSongResponse.data.song_list );
  }
  
  useEffect(() => {
    getRecommendList();
    getNewSongList();
    console.log( history );
  }, [])

  return (
    <div className="home-container">
      {
        history.location.pathname  !== '/play-music'
          ? <div>
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
            
            {/* // ? 推荐音乐 tab 内容 */}
            <Route path="/" exact>
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
            </Route>
    
            {/* // ? 热歌榜 tab 内容 */}
            <Route path="/hot" exact>
              <HotList />
            </Route>
    
            {/* // ? 搜索 tab 内容 */}
            <Route path="/search" exact>
              <Search />
            </Route>
          </div>
        : <PlayMusic />
      }
    </div>
  );
}