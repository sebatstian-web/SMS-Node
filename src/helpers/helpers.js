const { format } = require('timeago.js');

module.exports = {
  timeago: (date) => {
    return format(date, 'es');
  }
};
