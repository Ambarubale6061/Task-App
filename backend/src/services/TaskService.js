const TaskRepository = require("../repositories/TaskRepository");
const CreateTaskDto = require("../dtos/CreateTaskDto");

const taskRepo = new TaskRepository();

class TaskService {
  async createTask(data) {
    const parsed = CreateTaskDto.parse(data);
    return taskRepo.create(parsed);
  }
  async createTask(data) {
    // Add validation if needed
    return taskRepo.create(data);
  }

  async updateTask(id, data) {
    return taskRepo.update(id, data);
  }

  async getAllTasks() {
    return taskRepo.findAll();
  }
}

module.exports = TaskService;
