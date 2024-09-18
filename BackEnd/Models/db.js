const mongoose = require('mongoose');
// // tdA4KiJdxNcYihqR
const mongo_url = process.env.Mongo_connect;
console.log();


mongoose.connect(mongo_url).then(()=>{
    console.log('MongoDb Connected..');
}).catch((error)=>{
    console.log(`MongoDb connection err = ${error}`);
})