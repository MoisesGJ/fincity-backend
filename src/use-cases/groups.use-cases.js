import Group from '../models/groups.model.js'
import createError from 'http-errors'
import mongoose from 'mongoose'

async function getAll() {
  const allGroups = await Group.find()

  return allGroups
}

async function create(groupData) {
  const newGroup = await Group.create(groupData)
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

export default {
  getAll,
  create,
  getById
}
