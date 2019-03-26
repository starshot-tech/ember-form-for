import TextField from './text-field';
import { toMonthString } from '../../utils/date';

export default TextField.extend({
  type: 'month',

  serializeValue(value) {
    if (value instanceof Date) {
      return toMonthString(value);
    }

    return value;
  },

  deserializeValue(value) {
    if (value != null) {
      return new Date(value);
    }

    return value;
  }
});
