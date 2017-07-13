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
    return knex.select('id', 'field', 'mapping').from('account').orderBy('id');
}

getMapping=(field)=>{

    let param=[];
    field.forEach(field=>{
        console.log(field.field);
        param.push(field.field);
    });

    console.log(param);

 return knex.select('mapping').from('account').whereIn('field', param);
}

updateMapping=(records)=>{

   // return knex('account').update(records);

  return  Promise.all(records.map(record => {
        updateFieldsMapping(record.id,record.field,record.mapping).then(response => {

            return response;

        })
            .catch(error => {

                return error;
            });
    })).then(values => {

    });

    /*records.map(record => {
        updateFieldsMapping(record.id,record.field,record.mapping).then(response => {

            console.log(response);
        })
            .catch(error => {
                console.log(error);
                return error;
            });
    });*/
   /* let res=JSON.stringify(records);


    console.log(JSON.stringify(records));
    let updateQuery = [
            'INSERT INTO account (id, field, mapping) VALUES',
            (res).map(res, () => '(?)').join(','),
            'ON DUPLICATE KEY UPDATE',
            'field = VALUES(field),',
            'mapping = VALUES(mapping)'
        ].join(' '),

        vals = [];

    (res).map(record => {
        vals.push(record.id);
        vals.push(record.field);
        vals.push(record.mapping);
    });*/

   // return knex.raw(updateQuery, vals);
}

updateFieldsMapping=(id,field,mapping)=>{


    return knex('account')
        .where('id', '=',id)
        .update({
            field: field,
            mapping: mapping
        })
}




module.exports = {
    getFieldsMapping,
    updateMapping,
    getMapping
}