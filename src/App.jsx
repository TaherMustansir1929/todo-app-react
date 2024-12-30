import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";

const App = () => {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [])
  const [reverse, setReverse] = useState(false)
  const [finished, setFinished] = useState(true)
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleSave = () => {
    if (task.trim() === "") return setTask("")
    setTasks([...tasks, { id: uuidv4(), text: task, isCompleted: false }])
    setTask("")
  };

  const handleEdit = (id) => {
    let editTask = tasks.filter(task => task.id === id)
    setTask(editTask[0].text)
    handleDelete(id)
  };

  const handleDelete = (id) => {
    let newTaskList = tasks.filter(task => task.id !== id)
    setTasks(newTaskList)
  };

  const handleCheckbox = (id) => {
    let newTaskList = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task
    })
    setTasks(newTaskList)
  };

  const handleFinished = () => {
    setFinished(!finished)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 text-center text-xl font-semibold">
        Minimal To-Do App <span className="text-sm font-normal text-gray-300">- by ZeoXD</span>
      </nav>

      {/* Heading */}
      <header className="mt-6 text-3xl font-bold">Your Tasks</header>

      {/* Input Section */}
      <div className="mt-4 flex items-center space-x-3 flex-col sm:flex-row space-y-3">
        <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Add a new task..."
          className="px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white w-full max-w-2xl"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
        />

        
          <button
            className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-600"
            onClick={handleSave}
          >
            Save
          </button>
          </div>
          <div className="flex items-center space-x-3">
          {/* REVERSE BUTTON */}
          <span className={`text-xl hover:text-gray-300 cursor-pointer ${reverse ? "text-sky-500" : "text-gray-600"}`}
            onClick={() => { setReverse(!reverse) }}><BiSort /></span>

          {/* SHOW FINISHED BUTTON */}
          <span className={`relative text-xl hover:text-gray-300 cursor-pointer ${finished ? "text-sky-500" : "text-gray-600"}`}
            onClick={handleFinished}
            onMouseEnter={() => setTimeout(() => setShowInfo(true), 300)}
            onMouseLeave={() => setShowInfo(false)}>
            {showInfo && (
              <div className="absolute w-[137px] transition-all bottom-8 left-1/2 transform -translate-x-1/2 p-2 bg-gray-700 text-sm text-white rounded shadow-lg">
                Show finished tasks
              </div>
            )}
            <SiTicktick /></span>
        </div>
      </div>

      {/* To-Do List */}
      <ul className={`mt-6 w-11/12 max-w-lg flex ${reverse ? "flex-col-reverse" : "flex-col"}`}>
        {tasks.map((task) => {
          return ((!task.isCompleted || finished) && (<li key={task.id} className="flex items-center justify-between bg-gray-800 p-4 mb-2 rounded">
            <div className="flex items-center">

              {/* CHECKBOX */}
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 text-sky-500 focus:ring-sky-500"
                onChange={() => { handleCheckbox(task.id) }}
                checked={task.isCompleted}
              />

              <span className={task.isCompleted ? "line-through text-gray-400" : ""}>{task.text}</span>
            </div>
            <div className="flex space-x-2">

              {/* EDIT BUTTON */}
              <button className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600"
                onClick={() => { handleEdit(task.id) }}>
                <FaEdit />
              </button>

              {/* DELETE BUTTON */}
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => { handleDelete(task.id) }}>
                <MdOutlineDeleteForever />
              </button>

            </div>
          </li>)
          )
        })}
      </ul>
    </div>
  );
};

export default App;
