import yargs from 'yargs';
import clc from 'cli-color';
import {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
  readAllTasksAsync,
  listTasksWithTitle,
} from './models/index';

yargs.command({
  command: 'list-async',
  describe: 'List all tasks asynchronously',
  handler: async () => {
    const tasks = await readAllTasksAsync();
    console.log(clc.green('Tasks:'), tasks);
  },
});

yargs.command({
  command: 'filter-title',
  describe: 'List tasks with a specific title',
  builder: {
    title: {
      describe: 'Title to filter by',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (args) => {
    const { title } = args;
    const tasks = listTasksWithTitle(title);
    if (tasks.length > 0) {
      console.log(clc.yellow('Filtered Tasks:'), tasks);
    } else {
      console.log(clc.red('No tasks found with given title'));
    }
  },
});

yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("Created successful: ", newTask);
  },
});

yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(clc.blue("taskJson : "), result);
  },
});

yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log("task : ", task);
    } else {
      console.log("Not Found!");
    }
  },
});

yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log("task updated : ", task);
    } else {
      console.log(clc.red("Not Found!"));
    }
  },
});

yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log("delete task : ", task);
    } else {
      console.log("Not Found");
    }
  },
});

yargs.parse();