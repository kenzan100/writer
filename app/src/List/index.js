import { reaction, toJS } from 'mobx';

import listTemplate from 'html-loader!./tmpl.html';

const ItemView = Backbone.Marionette.View.extend({
  template: '<li> <%- name %> </li>'
});

export default Backbone.Marionette.CollectionView.extend({
  template: listTemplate,

  childView: ItemView,

  initialize(store) {
    this.store = store;
    this.collection = new Backbone.Collection();
    this.reactions = [];
    this.reactions.push(
      reaction(
        () => this.store.chunks.map((c) => toJS(c)),
        chunks => {
          this.collection.set(chunks);
        }
      )
    );
  },

  onDestroy() {
    this.reactions.forEach(dispose => dispose());
  }
});
