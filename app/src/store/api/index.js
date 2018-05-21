import axios from 'axios';

const POST_URL = '/hoge';

export default {
  updateArticle: (chunks) => {
    return axios.post(POST_URL, {
      chunks: chunks
    });
  }
};
