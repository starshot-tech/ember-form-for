import Ember from 'ember';
import TextField from './text-field';
import { toDateString } from '../../utils/date';

const { isEmpty } = Ember;

export default TextField.extend({
  type: 'date',

  serializeValue(value) {
    if (value instanceof Date) {
      return toDateString(value);
    }

    return value;
  },

  deserializeValue(value) {
    if (isEmpty(value)) {
      return null;
    }

    return new Date(value);
  }
});
