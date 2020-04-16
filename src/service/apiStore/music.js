import { request } from '../request';
import { FAIL, SUCCESS } from '../constants/requestStatus';

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