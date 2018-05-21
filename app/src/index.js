import Mn from 'backbone.marionette';
import template from 'html-loader!./layout.html';
import store from './store';

const Layout = Mn.LayoutView.extend({
  el: '#app-hook',

  template: template,

  initialize: () => {},

  events: {
    'click [data-bind="save"]': 'save'
  },

  save: function(a) {
    const txt = this.$el.children('textarea').text();
    store.addChunk(txt);
  }
});

const view = new Layout();
view.render();
