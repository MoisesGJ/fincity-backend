import mongoose from 'mongoose'
const { Schema } = mongoose

const schoolGradeSchema = new Schema({
  grade: {
    type: String,
    required: true,
    maxLength: 30
  }
})

const SchoolGrade = mongoose.model('schoolGrades', schoolGradeSchema)

export default SchoolGrade
