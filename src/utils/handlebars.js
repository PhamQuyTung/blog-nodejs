const moment = require('moment');

module.exports = {
    formatDate: (date) => {
        return moment(date).format('DD/MM/YYYY - HH:mm:ss');
    },
    
    inc: function (value) {
        return parseInt(value) + 1;
    },
};
