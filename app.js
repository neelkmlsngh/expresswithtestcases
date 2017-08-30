 //importing modules
 const express = require('express');
 const mongoose = require('mongoose');
 const bodyparser = require('body-parser');
 const cors = require('cors');
 const path = require('path');

 const app = express();

 const route = require('./routes/route');

 //connect to mongo db
 mongoose.connect('mongodb://localhost:27017/neel');

 //adding middleware -cors
 app.use(cors());

 //body - parser
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({ extended: false }))

 //static files
 app.use(express.static(path.join(__dirname, 'public')));

 //routes 
 app.use('/api', route);
 app.listen(3000)
 /*app.listen(port, () => {
     console.log('app listening on port ' + port)
 })*/
 module.exports=app