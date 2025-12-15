const Task = require("../models/Task");

class TaskRepository {
  async create(data) {
    return Task.create(data);
  }

  async findAll() {
    return Task.find();
  }

  async findById(id) {
    return Task.findById(id);
  }

  async update(id, data) {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Task.findByIdAndDelete(id);
  }
}

module.exports = TaskRepository;
