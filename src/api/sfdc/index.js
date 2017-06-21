import jsforce from 'jsforce';
import mfr from 'map-filter-reduce';

const conn = new jsforce.Connection();


conn.query("SELECT Id, Name FROM Account LIMIT 1")
  .then(function(res) {
    // receive resolved result from the promise,
    // then return another promise for continuing API execution.
    return conn.sobject('Account').create({ Name: 'Another Account' });
  })
  .then(function(ret) {
    // handle final result of API execution
    // ...
  }, function(err) {
    // catch any errors in execution
    // ...
  });