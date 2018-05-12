import Mn from 'backbone.marionette';
// import template from './layout.html';

const Layout = Mn.LayoutView.extend({
  el: '#app-hook',
  template: '<p>a</p>'
});

const view = new Layout();
view.render();
