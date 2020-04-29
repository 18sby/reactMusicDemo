import React from 'react';
import '../../styles/components/home/search.scss';
import { apiSearchSong } from '../../service/apiStore/music';
import { SearchBar, Toast } from 'antd-mobile';
import 'antd-mobile/lib/search-bar/style/css';
import 'antd-mobile/lib/toast/style/css';

export const Search = (props) => {
  // todo 输入框的回车事件
  const onSubmit = (keyWord) => {
    searchSong( keyWord );
  }

  // todo 搜索歌曲
  const searchSong = async (keyWord) => {
    const searchList = await apiSearchSong({ query: keyWord });
    if (searchList.data.error_code !== 22000) {
      Toast.info(searchList.data.error_message, 1.5);
    }
  }

  return (
    <div className="search-container">
      <SearchBar
        className="search-bar"
        placeholder="搜索歌曲"
        onSubmit={ onSubmit }
      />
      
      <div className="search-content">
        {/* 搜索内容 */}
      </div>

      <div className="search-history">
        {/* 搜索历史 */}
      </div>
    </div>
  );
}