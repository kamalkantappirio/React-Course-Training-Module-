/**
 * Created by lokendra on 12/07/17.
 */

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'appirio123',
        database : 'postgres'
    },
    pool: { min: 0, max: 7 }
});



getFildsMapping=()=>{

  console.log(knex.select('field', 'mapping', 'datatype').from('account'));
}



module.exports = {
    getFildsMapping
}