// get mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create profile schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    required: true,
    max: 20
  },
  company: { type: String },
  website: { type: String },
  skills: { type: [String], required: true },
  LinkedIn: { type: String },
  Education: [
    {
      school: { type: String, required: true },
      fieldOfStudy: { type: String, required: true },
      Location: { type: String },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false }
    }
  ],
  Experience: [
    {
      company: { type: String, required: true },
      JobTitle: { type: String, required: true },
      Location: { type: String },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
