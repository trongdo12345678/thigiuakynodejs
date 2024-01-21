import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface Task {
  id: string;
  title: string;
  description: string;
}

const readAllTask = (): Task[] => {
  const buffer: Buffer = fs.readFileSync("task.json");
  const taskString: string = buffer.toString();
  const taskJson: Task[] = JSON.parse(taskString);
  return taskJson;
};

const createTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: Math.random().toString(),
    title,
    description,
  };
  let taskList: Task[] = readAllTask();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

const readDetailTask = (id: string): Task | undefined => {
  let taskList: Task[] = readAllTask();
  const task: Task | undefined = taskList.find((task) => id === task.id);
  return task;
};

const updateTask = (id: string, title: string, description: string): Task | false => {
  let taskList: Task[] = readAllTask();
  const index: number = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const oldTask: Task = taskList[index];
    const newTask: Task = { ...oldTask, title, description };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};

const deleteTask = (id: string): Task | false => {
  let taskList: Task[] = readAllTask();
  const index: number = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task: Task = taskList[index];
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

const readAllTasksAsync = async (): Promise<Task[]> => {
  try {
    const taskString = await readFileAsync('task.json', 'utf-8');
    return JSON.parse(taskString);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
};

const listTasksWithTitle = (title: string): Task[] => {
  const tasks = readAllTask();
  return tasks.filter(task => task.title.includes(title));
};

export {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
  readAllTasksAsync,
  listTasksWithTitle,
};
