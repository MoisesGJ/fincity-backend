const mongoose = require('mongoose');
const { Schema } = mongoose;

const schoolGradeSchema = new Schema({
    grade: {
        type: String,
        required: true,
        maxLength: 30
    }

});

const schoolGrade = mongoose.model('schoolGrades', schoolGradeSchema);

module.exports = schoolGrade;