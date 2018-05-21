import Mn from 'backbone.marionette';
import template from 'html-loader!./layout.html';

const Layout = Mn.LayoutView.extend({
  el: '#app-hook',

  template: template,

  initialize: () => {},

  events: {
    'click [data-bind="save"]': 'save'
  },

  save: () => {
    console.log('fuga');
  }
});

const view = new Layout();
view.render();
