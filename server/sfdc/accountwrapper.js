/**
 * Created by lokendra on 20/07/17.
 */


// Load method categories.
const lodash = require('lodash');


function Account(value, mapping) {
    // Return a new instance Account if not already instantiated
  if (!(this instanceof Account)) return new Account(value, mapping);


  this.initialize(value, mapping);
}

const _getField = (key, value, mapping) => {
  const row = lodash.filter(mapping, { field: key });
  if (row.length > 0) { return value[row[0].mapping] === null ? '' : value[row[0].mapping]; }
  return '';
};

Account.prototype = {
  initialize(value, mapping) {
    this.Id = value.Id;
    this.name = _getField('name', value, mapping);
    this.address = _getField('address', value, mapping);

    this.goals = _getField('goals', value, mapping);

    this.notes = _getField('notes', value, mapping);

    this.strengths = _getField('strengths', value, mapping);

    this.target_total = _getField('target_total', value, mapping);

    this.target_to_date = _getField('target_to_date', value, mapping);

    this.target_from_date = _getField('target_from_date', value, mapping);

    this.target_existing = _getField('target_existing', value, mapping);
    this.target_estimate = _getField('target_estimate', value, mapping);
  },


  showKey() {

  }
};


module.exports = Account;
