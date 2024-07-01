import mongoose from 'mongoose'
const { Schema } = mongoose

const schoolGradeSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxLength: 30
  }
})

const SchoolGrade = mongoose.model('school_grades', schoolGradeSchema)

export default SchoolGrade
