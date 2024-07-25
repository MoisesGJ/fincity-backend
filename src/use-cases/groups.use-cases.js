import Group from '../models/groups.model.js'
import createError from 'http-errors'
import mongoose from 'mongoose'
import School from '../models/schools.model.js'
import SchoolGrade from '../models/school-grades.model.js'

async function getAll() {
  const allGroups = await Group.find()

  return allGroups
}

async function create(id, groupData) {
  const group = await Group.findOne({ teacher: id })

  if (group) throw new Error('Solo es posible crear un grupo')

  const { school, school_grade, description, status } = groupData

  const schoolM = await School.create({ school_name: school })
  const schoolGrade = await SchoolGrade.create({ description: school_grade })

  const data = {
    teacher: id,
    school: schoolM._id,
    school_grade: schoolGrade._id,
    description,
    status
  }

  if (
    !mongoose.isValidObjectId(data.teacher) ||
    !mongoose.isValidObjectId(data.school_grade) ||
    !mongoose.isValidObjectId(data.school)
  ) {
    throw new createError(400, 'Invalid id')
  }

  const newGroup = await Group.create(data)
  return newGroup
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const group = await Group.findById(id)
    .populate('school')
    .populate('school_grade')
  return group
}

async function getByProfesor(id) {
  const group = await Group.findOne({ teacher: id })

  console.log(group)

  if (!group) throw new Error('No hay grupo')

  return group
}

export default {
  getAll,
  create,
  getById,
  getByProfesor
}
