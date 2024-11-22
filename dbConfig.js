// @ts-nocheck
require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.URI).then(()=> console.log('Db  connected successful.')).catch((error)=>{console.log(error)});

