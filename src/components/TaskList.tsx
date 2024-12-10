import React from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import { format } from 'date-fns';
import { Button } from './ui/Button';

export function TaskList() {
  const { tasks, toggleComplete, deleteTask } = useTaskStore();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleComplete(task.id)}
                className={`p-2 rounded-full ${
                  task.completed
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Check
                  className={`w-5 h-5 ${
                    task.completed
                      ? 'text-green-500'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                />
              </button>
              <div>
                <h3
                  className={`font-semibold ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {task.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className={getPriorityColor(task.priority)}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}