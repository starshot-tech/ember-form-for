import Component from '@ember/component';

const attributeBlacklist = {
  // @note: imho we do not need update as we are using mut instead
  update: true,
  _sanitizeInput: true
};

export default Component.extend({
  tagName: 'input',
  attributeBindings: undefined,

  /** based on https://github.com/dockyard/ember-one-way-controls/issues/21 **/
  init() {
    this._super(...arguments);

    // Dynamically pass all attributes to <input> with the exception of blacklisted ones
    this.attributeBindings = [];

    // @todo: fix eslint warning
    for (let key in this.attrs) {
      let value;

      // Get value from MutableCells if needed
      if (typeof this.attrs[key] === 'object' && 'value' in this.attrs[key]) {
        value = this.attrs[key].value;
      } else {
        value = this.attrs[key];
      }

      // Do not add attribute if the value is empty
      // @todo: should be in didReceiveAttr?
      if (value && !attributeBlacklist[key]) {
        this.attributeBindings.push(key);
      }
    }
  }
});
