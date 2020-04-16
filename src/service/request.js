import { axios } from './axios';

export const request = ({ method = 'GET', url = '', params = {} }) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params
    }).then(response => {
      resolve(response)
    }, error => {
      reject(error);
    })
  })
}