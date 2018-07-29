import axios from 'axios';

const POST_URL = '/hoge';

export default {
  getChunks: () => {
    return axios.get(API_URL);
  },
  updateArticle: (chunks) => {
    return axios.post(API_URL, {
      'chunks': chunks
    });
  }
};
