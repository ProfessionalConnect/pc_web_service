import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const get = (middleUrl, payload) => {
  return axios.get(middleUrl, payload)
};

export const post = (middleUrl, payload) => {
  return axios.post(middleUrl, payload.body, {
    headers: payload.headers
  })
};

export const postNoHeader = (middleUrl, payload) => {
  return axios.post(middleUrl, payload.body)
};

export const put = (middleUrl, payload) => {
  return axios.put(middleUrl, payload.body, {
    headers: payload.headers
  })
};

export const putNoHeader = (middleUrl, payload) => {
  return axios.put(middleUrl, payload.body)
};

export const _delete = (middleUrl, payload) => {
  return axios.delete(middleUrl, payload)
};