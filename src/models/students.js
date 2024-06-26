const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  first_name: {
    type: String,
    maxlength: 50,
    required: true
  },
  last_name: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade',
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
