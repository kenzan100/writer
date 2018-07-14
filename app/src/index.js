import Mn from 'backbone.marionette';
import { template as templateFn } from 'underscore';
import template from 'html-loader!./layout.html';
import WriteView from './Write';
import ListView from './List';
import store from './store';

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
  template: template,

  regions: {
    writeChunk: '#write-chunk',
    readChunks: '#list-chunks'
  },

  onRender() {
    this.showChildView('writeChunk', new WriteView(store));
    this.showChildView('readChunks', new ListView(store));
  }
});

new App().start();
