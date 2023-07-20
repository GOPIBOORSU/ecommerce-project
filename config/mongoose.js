const mongoose = require('mongoose');

//connecting mongoose to its default server and ecommerceDB
mongoose.connect(process.env.URL, {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
// const connectDatabase=()=>{
//     mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully!');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//   });
// }


// module.exports = connectDatabase;