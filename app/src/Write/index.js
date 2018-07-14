import writeTemplate from 'html-loader!./tmpl.html';

export default Backbone.Marionette.View.extend({
  template: writeTemplate,

  events: {
    'click [data-bind="save"]': 'save'
  },

  initialize(store) {
    this.store = store;
  },

  save: function(a) {
    const txt = this.$el.find('textarea').val();
    this.store.addChunk(txt);
  }
});
