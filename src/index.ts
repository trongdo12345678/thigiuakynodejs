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
  handler: async (args: { title: string }) => {
    const { title } = args;
    const tasks = await listTasksWithTitle(title);
    if (tasks.length > 0) {
      console.log(clc.yellow('Filtered Tasks:'), tasks);
    } else {
      console.log(clc.red('No tasks found with the given title'));
    }
  },
});

// ... Other commands

// Use yargs.argv instead of yargs.parse()
yargs.argv;
