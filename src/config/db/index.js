const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connect successfully!!!');
    } catch(error) {
        console.log('MongoDB connect failure!!!');
    }
}

module.exports = { connect };
