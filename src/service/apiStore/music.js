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