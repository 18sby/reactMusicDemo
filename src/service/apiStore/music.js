import { request } from '../request';
import { FAIL, SUCCESS } from '../constants/requestStatus';

// type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜

// todo 请求热歌榜
export const apiHotSongs = () => {
  return request({
    method: 'GET',
    url: '/?method=baidu.ting.billboard.billList&type=2&size=20&offset=0'
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 请求推荐歌曲榜
export const apiRecommendList = () => {
  return request({
    method: 'GET',
    url: '/?method=baidu.ting.billboard.billList&type=22&size=20&offset=0'
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 请求新歌榜
export const apiNewSongs = () => {
  return request({
    method: 'GET',
    url: '/?method=baidu.ting.billboard.billList&type=1&size=10&offset=0'
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 搜索歌曲
export const apiSearchSong = ({ query = '' }) => {
  return request({
    method: 'GET',
    url: `/?method=baidu.ting.search.catalogSug&query=${query}`
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 获取歌曲信息
export const apiSongInfo = ({ songId = '' }) => {
  return request({
    method: 'GET',
    url: `/?method=baidu.ting.song.play&songid=${songId}`
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 获取歌词
export const apiLRC = ({ songId = '' }) => {
  return request({
    method: 'GET',
    url: `/?method=baidu.ting.song.lry&songid=${songId}`
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 获取歌手列表
export const apiArtists = ({ tingUid = '', limits = 6 }) => {
  return request({
    method: 'GET',
    url: `/?method=baidu.ting.artist.getSongList&tinguid=${tingUid}&limits=${limits}&use_cluster=1&order=2`
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}

// todo 获取播放链接
export const apiPlaySource = ({ songId = '' }) => {
  return request({
    method: 'GET',
    url: `/?method=baidu.ting.song.play&songid=${songId}`
  }).then(response => {
    return Promise.resolve({
      type: SUCCESS,
      data: response.data
    });
  }, error => {
    return Promise.resolve({
      type: FAIL,
      message: error
    })
  })
}
