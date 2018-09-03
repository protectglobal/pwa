const mongoose = require('mongoose');

const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id required'],
  },
  cannonId: {
    type: String, // TODO: mongoose.Schema.Types.ObjectId
    required: [true, 'Cannon id required'],
  },
  eventType: {
    type: String,
    enum: ['panicBtn', 'armCannon'],
    required: [true, 'Event type required'],
  },
  eventValue: {
    type: [String],
    required: [true, 'Event value required'],
  },
});

const OutgoingEvent = mongoose.model('OutgoingEvent', schema);

module.exports = OutgoingEvent;

