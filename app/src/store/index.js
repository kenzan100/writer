import { action, observable } from 'mobx';
import api from './api';

const store = observable({
  chunks: [],
  addChunk(text) {
    const index = this.chunks.length;
    this.chunks.splice(index, 0, text);
    api.updateArticle(this.chunks.toJSON()).then(
      action("onSuccess", chunks => {
        console.log(chunks);
      }),
      action("onError", error => {
        console.error(error);
      })
    );
  }
}, {
  addChunk: action
});

export default store;
