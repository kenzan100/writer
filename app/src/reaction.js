export default Backbone.Marionette.Behavior.extend({
  initialize() {
    this.view.reactions = [];
    this.view.addReactions = this.addReactions;
  },

  addReactions(reactions) {
    reactions.forEach(reaction => this.reactions.push(reaction));
  },

  onDestroy() {
    this.view.reactions.forEach(dispose => dispose());
  }
});
