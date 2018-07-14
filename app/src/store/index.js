import { action, observable } from 'mobx';
import api from './api';

const store = observable({
  uiState: {
    isWriteShown: true,
    isListShown: false,
    whereToAdd: null
  },
  chunks: [],
  addChunk(text) {
    let index;
    if (this.uiState.whereToAdd !== null) {
      index = parseInt(this.uiState.whereToAdd);
    } else {
      index = this.chunks.length;
    }
    this.chunks.splice(index, 0, { name: text });
    this.chunks.forEach((c, i) => c.position = i);
    this.uiState.isWriteShown = false;
    this.uiState.isListShown = true;
    this.uiState.whereToAdd = null;
    api.updateArticle(this.chunks.toJSON()).then(
      action("onSuccess", chunks => {
        console.log(chunks);
      }),
      action("onError", error => {
        console.error(error);
      })
    );
  },
  addHere(position) {
    this.uiState.whereToAdd = position;
    this.uiState.isWriteShown = true;
    this.uiState.isListShown = false;
  }
}, {
  addChunk: action,
  addHere: action
});

import { wiretap, inspect } from "mobx-wiretap";
wiretap("Todo app");
inspect("Todos Array", store);

window.store = store;

export default store;
