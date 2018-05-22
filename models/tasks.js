var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Task = new Schema({
  name: {
    type: String
  },
  priority: {
    type: String
  }
},{
    collection: 'tasks'
});

module.exports = mongoose.model('Task', Task);