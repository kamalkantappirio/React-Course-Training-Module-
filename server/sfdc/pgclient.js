/* eslint-disable array-callback-return */
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: '5433',
    user: 'postgres',
    password: 'appirio123',
    database: 'postgres'
  },
  pool: { min: 0, max: 7 }
});


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
