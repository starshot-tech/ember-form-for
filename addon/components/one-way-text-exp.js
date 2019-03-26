import Component from '@ember/component';
import { computed } from '@ember/object';

const attributeBlacklist = {
  update: true,
  _sanitizeInput: true,
  serializeValue: true,
  deserializeValue: true,
  _value: true
};

export default Component.extend({
  tagName: 'input',
  attributeBindings: undefined,

  value: computed('_value', {
    get() {
      if (this.get('serializeValue')) {
        return this.get('serializeValue')(this.get('_value'));
      } else {
        return this.get('_value');
      }
    },
    set() {
      // @todo??
    }
  }),

  /** based on https://github.com/dockyard/ember-one-way-controls/issues/21 **/
  init() {
    this._super(...arguments);

    let { attrs } = this;

    // Dynamically pass all attributes to <input> with the exception of blacklisted ones
    //    this.attributeBindings = ['type', 'value'];
    this.attributeBindings = ['value'];

    for (let key in attrs) {
      let value;

      // Get value from MutableCells if needed
      if (typeof attrs[key] === 'object' && 'value' in attrs[key]) {
        value = attrs[key].value;
      } else {
        value = attrs[key];
      }

      // Do not add attribute if the value is empty
      // @todo: should be in didReceiveAttr?
      if (value && !attributeBlacklist[key]) {
        this.attributeBindings.push(key);
      }
    }
  },

  serializeValue(value) {
    return value;
  },

  deserializeValue(value) {
    return value;
  }
});
