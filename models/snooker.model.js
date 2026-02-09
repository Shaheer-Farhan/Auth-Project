import mongoose from "mongoose";

const snookerTableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 6,
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Date,
    default: null,
  },
  endTime: {
    type: Date,
    default: null,
  },
  totalElapsedMinutes: {
    type: Number,
    default: 0, // total minutes played so far
  },
  currentPrice: {
    type: Number,
    default: 0, // Rs 14 per minute
  },
}, { timestamps: true });

// Virtual field to calculate live price dynamically
snookerTableSchema.virtual('livePrice').get(function() {
  if (this.isRunning && this.startTime) {
    const now = new Date();
    const diffMs = now - this.startTime;
    const diffMinutes = Math.floor(diffMs / 60000);
    return (diffMinutes * 14);
  }
  return this.currentPrice;
});

// Helper methods for starting and stopping
snookerTableSchema.methods.startTable = function() {
  if (!this.isRunning) {
    this.isRunning = true;
    this.startTime = new Date();
    this.endTime = null;
  }
};

snookerTableSchema.methods.stopTable = function() {
  if (this.isRunning) {
    this.isRunning = false;
    this.endTime = new Date();
    const diffMs = this.endTime - this.startTime;
    const diffMinutes = Math.floor(diffMs / 60000);
    this.totalElapsedMinutes += diffMinutes;
    this.currentPrice += diffMinutes * 14;
  }
};

const SnookerTable = mongoose.model('SnookerTable', snookerTableSchema);
export {
    SnookerTable
}
