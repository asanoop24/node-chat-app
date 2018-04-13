const moment = require('moment');

var date = moment();
console.log(date.format(''));
console.log(date.valueOf());
console.log(date.format('h:mm a'));
date.add(1, 'year');
console.log(date.format('YYYY hh Do Y dddd'));
