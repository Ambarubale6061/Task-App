const { z } = require("zod");

const CreateTaskDto = z.object({
  title: z.string().max(100),
  description: z.string().optional(),
  dueDate: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]),
  assignedToId: z.string().optional(),
});

module.exports = CreateTaskDto;
