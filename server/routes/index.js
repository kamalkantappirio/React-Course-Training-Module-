const express = require('express');

const router = express.Router();

router.get('/account', function(req, res){
    console.log('here')
});

module.exports = router;