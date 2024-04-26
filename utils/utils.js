const moment = require('moment');

// created time for POST
function getCreatedAt() {
  return moment();
}

// Modified time for PUT
function getModifiedAt() {
  return moment();
}
module.exports = {
  noteNr,
  getModifiedAt,
  getCreatedAt,
};