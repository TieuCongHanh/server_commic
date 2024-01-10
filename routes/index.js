var express = require('express');
var router = express.Router();

var sock = require('../Socket_server');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/notify', (req,res, next)=>{
  sock.io.emit("new msg", "Noi dung thong bao");
  res.end();
})


module.exports = router;
