/* eslint-disable array-callback-return */
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: '5433',
    user: 'postgres',
    password: '',
    database: 'postgres'
  },
  pool: { min: 0, max: 200 }
});


knex.schema.createTableIfNotExists('account', (table) => {
  table.increments('id').primary();
  table.string('field', 500);
  table.string('mapping', 500);
  table.string('user', 500);
}).then(() => knex('account')
  .returning('id')
  .insert([
    { field: 'name', mapping: 'name' },
    { field: 'address', mapping: 'BillingCity' },
    { field: 'goals', mapping: 'mh_Goals__c' },
    { field: 'notes', mapping: '' },
    { field: 'strengths', mapping: '' },
    { field: 'target_total', mapping: '' },
    { field: 'target_to_date', mapping: '' },
    { field: 'target_from_date', mapping: '' },
    { field: 'target_existing', mapping: '' },
    { field: 'target_estimate', mapping: '' }
  ]));


const getFieldsMapping = () => knex.select('id', 'field', 'mapping').from('account').orderBy('id');

const getMapping = (field) => {
  const param = [];
  field.forEach((row) => {
    param.push(row.field);
  });


  return knex.select('mapping').from('account').whereIn('field', param);
};

const updateFieldsMapping = (id, field, mapping) => knex('account')
  .where('id', '=', id)
  .update({
    field,
    mapping
  });

const updateMapping = records => Promise.all(records.map((record) => {
  updateFieldsMapping(record.id, record.field, record.mapping).then(response => response)
    .catch(error => error);
})).then(() => {

});


module.exports = {
  getFieldsMapping,
  updateMapping,
  getMapping
};
