"use client";
import React, { useState, useEffect } from "react";
import useTodoStore from "../app/store";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: { id: string; title: string; description: string } | null; // Make task nullable
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const { updateTask, deleteTask } = useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Prefill the modal with task data when it opens
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleUpdateTask = () => {
    if (title.trim()) {
      updateTask(task?.id, { title, description });
      onClose();
    }
  };

  const handleDeleteTask = () => {
    if (task?.id) {
      deleteTask(task.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="m-4 bg-white p-6 rounded-lg shadow-lg text-black max-w-md w-full">
        <div className="flex mb-4">
          <h2 className="text-xl font-bold">Edit Task</h2>
          <button
            onClick={onClose}
            className="flex justify-center items-center ml-auto h-6 w-6 rotate-45 text-lg border border-black rounded-full hover:bg-gray-400"
          >
            +
          </button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded-lg mb-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex justify-start space-x-2">
          <button
            onClick={handleUpdateTask}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Save Changes
          </button>
          <button
            onClick={handleDeleteTask}
            className="p-2 border border-red-500 text-red-500 rounded-lg"
          >
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
              className="h-4 w-4 lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
