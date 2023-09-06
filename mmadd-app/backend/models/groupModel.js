const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      required: true,
    },
    tehnologija: {
      type: String,
      required: true,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const groupModel = mongoose.model("group", groupSchema);

module.exports = groupModel;
