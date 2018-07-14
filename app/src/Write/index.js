import { reaction, toJS } from 'mobx';
import Reaction from 'reaction';

export default Backbone.Marionette.View.extend({
  template: `
    <div>
      <textarea></textarea>
      <button data-bind="save">Save</button>
    </div>
  `,

  behaviors: [Reaction],

  events: {
    'click [data-bind="save"]': 'save'
  },

  initialize(store) {
    this.store = store;
  },

  onRender() {
    this.$el.find('textarea').blur().focus();
  },

  save: function(a) {
    const txt = this.$el.find('textarea').val();
    this.store.addChunk(txt);
  }
});
