const express = require('express');
const router = express.Router();
const account = require('../sfdc');

router.get('/account', function(req, res){

  const creds = req.query;
  const request = req;
  let aDetail;

  if(!req.session.accessToken) {
    aDetail = account.getConnection(creds.username, creds.password);
  } else {
    aDetail = account.getCurrentConnection(request.session.instanceUrl, request.session.accessToken)  
  }
  
  
  aDetail.then(response => {
    request.session.instanceUrl = response.instanceUrl;
    request.session.accessToken = response.accessToken;
    const results = account.getContacts(response);
    return results;
    }) 
    .then(results => {
        const sessionData = [{
            accessToken: request.session.accessToken
        }];
        const dataObj = Object.assign(results, sessionData);
        return res.json(dataObj);
    })
    .catch(error => {
        console.log(error);
        return error;
    });
});


module.exports = router;