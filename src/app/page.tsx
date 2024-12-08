"use client";
import React, { useState } from "react";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskDialog";
import EditTaskModal from "../components/EditTaskDialog";
import dayjs from "dayjs";

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTaskEdit = (task: any) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const getDayClass = (day: dayjs.Dayjs, selectedDate: string): string => {
    if (selectedDate === day.format("YYYY-MM-DD")) {
      return "text-white";
    } else if (day.isAfter(dayjs(), "day")) {
      return "text-gray-400";
    } else {
      return "text-black";
    }
  };

  const formatSelectedDate = (selectedDate: string) => {
    const today = dayjs();
    const selectedDay = dayjs(selectedDate);

    // Compare selected date with today
    if (selectedDay.isSame(today, "day")) {
      return "Today";
    }
    if (selectedDay.isSame(today.subtract(1, "day"), "day")) {
      return "Yesterday";
    }
    if (selectedDay.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    }

    return selectedDay.format("dddd, DD");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <div className="max-w-lg mx-auto overflow-hidden">
        <h1 className="font-extrabold bg-white text-black text-2xl px-4 py-2">
          onday
        </h1>
        <header className="flex justify-center items-center bg-white rounded-br-3xl rounded-bl-3xl shadow-xl shadow-gray-200 p-4 mb-6">
          {Array.from({ length: 7 }, (_, i) => {
            const day = dayjs().add(i - 3, "day");

            return (
              <div
                key={day.format("YYYY-MM-DD")}
                onClick={() => handleDateSelect(day.format("YYYY-MM-DD"))}
                className={`flex flex-col items-center justify-center p-2 px-3 mx-1.5 rounded-lg ${
                  selectedDate === day.format("YYYY-MM-DD")
                    ? "bg-black text-white"
                    : "text-gray-400"
                }`}
              >
                <p className="text-xs">{day.format("dd").charAt(0)}</p>
                <p
                  className={`text-sm font-bold ${getDayClass(day, selectedDate)}`}
                >
                  {day.format("DD")}
                </p>
              </div>
            );
          })}
        </header>
        <p className="text-black font-bold px-4">
          {formatSelectedDate(selectedDate)}
        </p>
        <TaskList selectedDate={selectedDate} onTaskEdit={handleTaskEdit} />
      </div>
      <div>
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          selectedDate={selectedDate}
        />
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={editingTask}
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-6 right-[45%] bg-white text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center text-2xl"
        >
          +
        </button>
      </div>
    </main>
  );
};

export default Home;
