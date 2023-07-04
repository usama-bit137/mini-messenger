const mongoose = require('mongoose');

// this is the mongoose schema:
const messageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: new Date(),
  },
});

// This is the mongoose model which is exported:
const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
