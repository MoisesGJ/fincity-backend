import Task from '../models/tasks.model.js'
import createError from 'http-errors'

async function getAll() {
  const allTasks = await Task.find()
  return allTasks
}

export default {
  getAll
}
