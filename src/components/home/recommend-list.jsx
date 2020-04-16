import React from 'react';
import { ListTitle } from './list-title';
import { RecommendItem } from './recommend-item';
import '../../styles/components/home/recommend-list.scss';

export const RecommendList = (props) => {
  return (
    <div className="recommend-list-container">
      <ListTitle title="推荐歌曲" />
      <div className="content-box">
        {
          props.musicList && props.musicList.map((item, index) => {
            if (index >= 6) return null;
            return <RecommendItem key={item.artist_id} music={item} />
          })
        }
      </div>
    </div>
  );
}