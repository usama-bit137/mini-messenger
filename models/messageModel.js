const mongoose = require('mongoose');

// this is the mongoose schema:
const messageSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  added: {
    type: Date,
    default: new Date(),
  },
});

// This is the mongoose model which is exported:
const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
