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

    let date = new Date(value);
    return convertUTCDateToLocalDate(date);
  }
});

function convertUTCDateToLocalDate(date) {
  let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  let offset = date.getTimezoneOffset() / 60;
  let hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}
