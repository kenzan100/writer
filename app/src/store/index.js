import { action, observable } from 'mobx';

const store = observable({
  chunks: [],
  addChunk(text) {
    const index = this.chunks.length;
    this.chunks.splice(index, 0, text);
  }
}, {
  addChunk: action
});

export default store;
