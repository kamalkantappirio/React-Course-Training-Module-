/* eslint-disable array-callback-return */
const dbtable = require('./constants');
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 200 }
});

/*
knex.schema.hasTable(dbtable.TABLE_CONST.MAPPING).then((exists) => {
  if (!exists) {
    knex.schema.createTable(dbtable.TABLE_CONST.MAPPING, (table) => {
      table.increments('id').primary();
      table.string('field', 500);
      table.string('mapping', 500);
      table.string('user', 500);
    }).then(() => knex(dbtable.TABLE_CONST.MAPPING)
            .returning('id')
            .insert([
                { field: 'name', mapping: 'Name', user: '' },
                { field: 'address', mapping: 'BillingCity', user: '' },
                { field: 'goals', mapping: 'mh_Goals__c', user: '' },
                { field: 'notes', mapping: '', user: '' },
                { field: 'strengths', mapping: '', user: '' },
                { field: 'target_total', mapping: '', user: '' },
                { field: 'target_to_date', mapping: '', user: '' },
                { field: 'target_from_date', mapping: '', user: '' },
                { field: 'target_existing', mapping: '', user: '' },
                { field: 'target_estimate', mapping: '', user: '' }
            ]));
  }
});
*/

const setUpTable = userid => knex.schema.hasTable(dbtable.TABLE_CONST.MAPPING).then((exists) => {
  if (!exists) {
    knex.schema.createTable(dbtable.TABLE_CONST.MAPPING, (table) => {
      table.increments('id').primary();
      table.string('field', 500);
      table.string('mapping', 500);
      table.string('user', 500);
    }).then(() => knex(dbtable.TABLE_CONST.MAPPING)
                .returning('id')
                .insert([
                    { field: 'name', mapping: 'Name', user: userid },
                    { field: 'address', mapping: 'BillingCity', user: userid },
                    { field: 'goals', mapping: 'mh_Goals__c', user: userid },
                    { field: 'notes', mapping: '', user: userid },
                    { field: 'strengths', mapping: '', user: userid },
                    { field: 'target_total', mapping: '', user: userid },
                    { field: 'target_to_date', mapping: '', user: userid },
                    { field: 'target_from_date', mapping: '', user: userid },
                    { field: 'target_existing', mapping: '', user: userid },
                    { field: 'target_estimate', mapping: '', user: userid }
                ])).catch(error => error);
  } else {
    knex(dbtable.TABLE_CONST.MAPPING).count('id').where(knex.raw('?? = ?', ['user', `${userid}`])).then(((rows) => {
      if (rows[0].count <= 0) {
        knex(dbtable.TABLE_CONST.MAPPING)
              .returning('id').insert([
              { field: 'name', mapping: 'Name', user: userid },
              { field: 'address', mapping: 'BillingCity', user: userid },
              { field: 'goals', mapping: 'mh_Goals__c', user: userid },
              { field: 'notes', mapping: '', user: userid },
              { field: 'strengths', mapping: '', user: userid },
              { field: 'target_total', mapping: '', user: userid },
              { field: 'target_to_date', mapping: '', user: userid },
              { field: 'target_from_date', mapping: '', user: userid },
              { field: 'target_existing', mapping: '', user: userid },
              { field: 'target_estimate', mapping: '', user: userid }
              ]).catch(error => error);
      }
    }))
        .catch(error => error);
  }
}).catch(error => error);

const getFieldsMapping = userId => knex.select('id', 'field', 'mapping').from(dbtable.TABLE_CONST.MAPPING).orderBy('id').where('user', '=', userId);

const getMapping = (field) => {
  const param = [];
  field.forEach((row) => {
    param.push(row.field);
  });


  return knex.select('mapping', 'field').from(dbtable.TABLE_CONST.MAPPING).whereIn('field', param);
};

const updateFieldsMapping = (id, field, mapping) => knex(dbtable.TABLE_CONST.MAPPING)
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
  getMapping,
  setUpTable
};
