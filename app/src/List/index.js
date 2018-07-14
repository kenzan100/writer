import { reaction, toJS } from 'mobx';

import Reaction from 'reaction';

const ItemView = Backbone.Marionette.View.extend({
  template: `
    <button data-bind="addHere">+ (at <%- position %>)</button>
    <li>
      <%- name %>
    </li>
  `,

  triggers: {
    'click [data-bind="addHere"]': 'addHere:clicked'
  }
});

export default Backbone.Marionette.CompositeView.extend({
  template: `
    <ul>
      <div id="child-view-container">
      </div>
      <button data-bind="addHere">+</button>
    </ul>
  `,

  childView: ItemView,
  childViewContainer: '#child-view-container',
  behaviors: [Reaction],

  // FIXME: duplicated DOM selector
  events: {
    'click [data-bind="addHere"]': 'addHere'
  },
  childViewEvents: {
    'addHere:clicked': 'addHere'
  },

  addHere: function(a, b, c) {
    let position = null;
    if (a.model) {
      position = a.model.get('position');
    }
    this.store.addHere(position);
  },

  initialize(store) {
    this.store = store;
    this.collection = new Backbone.Collection();
    this.addReactions([
      reaction(
        () => this.store.chunks.map((c) => toJS(c)),
        chunks => {
          this.collection.set(chunks);
        },
        { fireImmediately: true }
      )
    ]);
  }
});
