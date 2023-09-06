const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    zahtevi: {
      type: Array,
      default: [],
    },
    aplikacije: {
      type: Array,
      default: [],
    },
    imegrupe: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, //ZA DOBIJANJE REALNOG VREMENA FORMIRANJA KORISNIKA
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
