import Mn from 'backbone.marionette';
import { template as templateFn } from 'underscore';
import WriteView from 'Write';
import ListView from 'List';
import store from 'store';
import Reaction from 'reaction';
import { reaction, toJS } from 'mobx';

Backbone.Marionette.View.setRenderer(function(tmpl, data) {
  return templateFn(tmpl)(data);
});

const App = Backbone.Marionette.Application.extend({
  region: '#app-hook',

  onStart() {
    this.showView(new RootView());
  }
});

const RootView = Backbone.Marionette.View.extend({
  template: `
    <div>
      <div id="write-chunk"></div>
      <div id="list-chunks"></div>
    </div>
  `,

  behaviors: [Reaction],

  regions: {
    writeChunk: '#write-chunk',
    readChunks: '#list-chunks'
  },

  initialize() {
    this.addReactions([
      reaction(
        () => toJS(store.uiState),
        state => {
          if (state.isWriteShown) {
            this.showChildView('writeChunk', new WriteView(store));
          } else {
            this.getRegion('writeChunk').empty();
          }
          if (state.isListShown) {
            this.showChildView('readChunks', new ListView(store));
          } else {
            this.getRegion('readChunks').empty();
          }
        },
        { fireImmediately: true }
      )
    ]);
  }
});

new App().start();
