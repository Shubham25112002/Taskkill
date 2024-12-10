import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Dashboard } from './components/Dashboard';
import { useThemeStore } from './store/useThemeStore';
import { Button } from './components/ui/Button';

function App() {
  const { theme, toggleTheme } = useThemeStore();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'light' ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div className="mb-8">
          <Dashboard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Task</h2>
            <TaskForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Tasks</h2>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;