let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define collection and schema for Items
let Task = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  priority: {
    type: Number
  },
  description:{
    type: String
  },
  isCompleted: {
    type: Boolean
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  subtasks: {
    type: Object
  }

}, {
  collection: 'tasks'
});

module.exports = mongoose.model('Task', Task);