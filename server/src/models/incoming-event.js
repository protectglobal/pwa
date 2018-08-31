const mongoose = require('mongoose');

const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cannonId: {
    type: String, // TODO: mongoose.Types.ObjectId
    required: [true, 'Cannon id required'],
  },
  eventType: {
    type: String,
    enum: ['faultCode', 'cannonInput'],
    required: [true, 'Event type required'],
  },
  eventValue: {
    type: [String],
    required: [true, 'Event value required'],
  },
});

const IncomingEvent = mongoose.model('IncomingEvent', schema);

module.exports = IncomingEvent;

