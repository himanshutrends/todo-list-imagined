import React from "react";
import useTodoStore from "../app/store";

export interface ITestState {
  listItems: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface TaskListProps {
  selectedDate: string;
  onTaskEdit: (task: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ selectedDate, onTaskEdit }) => {
  const { tasks, toggleTask } = useTodoStore();

  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <div className="p-4 space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg shadow-gray-200 text-black"
          >
            <div className="flex items-start space-x-4">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full border-2 border-black shadow hover:shadow-md checked:bg-slate-800 checked:border-slate-800"
                    id="check-custom-style"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </label>
              </div>
              <div
                className="grid items-start"
                onClick={() => onTaskEdit(task)}
              >
                <p
                  className={`${
                    task.completed ? "line-through" : ""
                  } text-lg font-bold`}
                >
                  {task.title}
                </p>
                <p
                  className={`${task.completed ? "line-through" : ""} text-sm`}
                >
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks for this day.</p>
      )}
    </div>
  );
};

export default TaskList;
