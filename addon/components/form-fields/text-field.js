import Ember from 'ember';
import layout from '../../templates/components/form-fields/text-field';

const { Component, set, get } = Ember;

const TextFieldComponent = Component.extend({
  tagName: '',
  type: 'text',
  layout,

  control: 'one-way-text-exp',

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },

  actions: {
    _update(value) {
      this.update(
        this.get('object'),
        this.get('propertyName'),
        this.get('deserializeValue')(
          value,
          get(this.get('object'), this.get('propertyName'))
        )
      );
    }
  }
});

TextFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default TextFieldComponent;
