import { create } from 'zustand';
import { Task } from '../types/task';
import { storage } from '../lib/storage';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: storage.get<Task[]>('tasks', []),
  addTask: (task) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ];
      storage.set('tasks', newTasks);
      return { tasks: newTasks };
    }),
  updateTask: (id, updatedTask) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      storage.set('tasks', newTasks);
      return { tasks: newTasks };
    }),
  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      storage.set('tasks', newTasks);
      return { tasks: newTasks };
    }),
  toggleComplete: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      storage.set('tasks', newTasks);
      return { tasks: newTasks };
    }),
}));