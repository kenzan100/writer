import { action, observable } from 'mobx';
import api from './api';

const store = observable({
  chunks: [],
  addChunk(text) {
    const index = this.chunks.length;
    this.chunks.splice(index, 0, { name: text });
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

// import { wiretap, inspect } from "mobx-wiretap";
// wiretap("Todo app");
// inspect("Todos Array", store);

export default store;
