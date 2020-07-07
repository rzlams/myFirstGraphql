const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: process.env.NODE_ENV === 'development' // true in Dev and false in Prod due to performace impact
}).then(
    () => { console.log('Mongoose is connected') },
    err => { console.log('Mongoose has an error: ' + err) }
);

mongoose.connection.on('error', err => {
    logError(err);
});

module.exports = mongoose;
