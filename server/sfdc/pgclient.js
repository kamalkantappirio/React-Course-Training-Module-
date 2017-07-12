/**
 * Created by lokendra on 12/07/17.
 */

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        port:'5433',
        user : 'postgres',
        password : 'appirio123',
        database : 'postgres'
    },
    pool: { min: 0, max: 7 }
});



getFieldsMapping=()=>{

    return knex.select('id','field','mapping','datatype')
        .from('account');



}


updateMapping=(records)=>{


        let updateQuery = [
                'INSERT INTO account (id, field, mapping) VALUES',
                _.map(records, () => '(?)').join(','),
                'ON DUPLICATE KEY UPDATE',
                'field = VALUES(field),',
                'mapping = VALUES(mapping)'
            ].join(' '),

            vals = [];

        (records).map(record => {
            vals.push(record.id);
            vals.push(record.field);
            vals.push(record.mapping);
        });

        return knex.raw(updateQuery, vals);


}

updateFieldsMapping=(id,field,mapping)=>{

    return knex('account')
        .where('id', '==',id)
        .update({
            field: field,
            mapping: mapping
        })



}




module.exports = {
    getFieldsMapping,
    updateMapping
}