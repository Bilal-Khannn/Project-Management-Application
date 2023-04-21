import React, { useState, useEffect } from "react";
import db from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  addDoc,
  where,
  getDocs,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrashCan,
  faPlus,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const { currentUser } = useAuth();

  // redirect to Landing page if user logs out
  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleOptionClick = (option) => {
    if (option === "createProject") {
      fetchProjects();
    } else if (option === "manageTask") {
      fetchTasks();
    }
    setSelectedOption(option);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  //Called when the user clicks on the create project button
  async function createProject() {
    const name = document.getElementById("project_title").value;
    const createdBy = currentUser.uid;

    try {
      // Add a new document with the provided values to the "projects" collection
      const docRef = await addDoc(collection(db, "projects"), {
        name,
        createdBy,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const fetchProjects = async () => {
    try {
      let id = currentUser.uid;
      const docref = collection(db, "projects");
      const q = query(docref, where("createdBy", "==", id));
      const querySnapshot = await getDocs(q);
      const fetchedProjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(fetchedProjects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  function handledropdown() {
    console.log("dropdown clicked!");
  }

  //delete the project from the database
  async function handleDeleteProject(id) {
    try {
      const projectDocRef = doc(db, "projects", id);
      await deleteDoc(projectDocRef);
      console.log("Project deleted successfully!");
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  }

  /*Task management related stuff*/
  const [tasks, setTasks] = useState([]);

  const [deadline, setDeadline] = useState(new Date());

  const handleDateChange = (date) => {
    setDeadline(date);
  };

  const createTask = async () => {
    const name = document.getElementById("task_name").value;
    const projectId = selectedProject;
    const status = document.getElementById("task_status").value;

    try {
      // Add a new document with the provided values to the "tasks" collection
      const docRef = await addDoc(collection(db, "tasks"), {
        name,
        projectId,
        deadline,
        status,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // fetch the tasks created in the function above
  const fetchTasks = async () => {
    try {
      const docref = collection(db, "tasks");
      const q = query(docref, where("projectId", "==", selectedProject));
      const querySnapshot = await getDocs(q);
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  //delete the task from the database
  async function handleDeleteTask(id) {
    try {
      const taskDocRef = doc(db, "tasks", id);
      await deleteDoc(taskDocRef);
      console.log("Task deleted successfully!");
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  }

  function convertDate(deadline) {
    const timestamp = deadline;

    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDateTime;
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/5 border-r flex flex-col justify-center">
        <ul className="space-y-4 mx-auto flex flex-col w-full">
          <button
            className={`py-4 px-4 text-customGreenBlue text-lg font-medium rounded-md hover:bg-indigo-50 hover:text-customGreenBlue transition duration-300     ${
              selectedOption === "createProject" ? "bg-indigo-50" : ""
            }`}
            onClick={() => handleOptionClick("createProject")}
          >
            Create Project
          </button>
          <button
            className={`py-4 px-4 cursor-pointer text-customGreenBlue text-lg font-medium rounded-md hover:bg-indigo-50 hover:text-customGreenBlue transition duration-300 ${
              selectedOption === "assignTasks" ? "bg-indigo-50" : ""
            }`}
            onClick={() => handleOptionClick("assignTasks")}
          >
            Assign Tasks
          </button>
          <button
            className={`py-4 px-4 text-customGreenBlue text-lg font-medium rounded-md hover:bg-indigo-50 hover:text-customGreenBlue transition duration-300 ${
              selectedOption === "manageTask" ? "bg-indigo-50" : ""
            }`}
            onClick={() => handleOptionClick("manageTask")}
          >
            Manage Task
          </button>
          <button
            className={`py-4 px-4 text-customGreenBlue text-lg font-medium rounded-md hover:bg-indigo-50 hover:text-customGreenBlue transition duration-300 ${
              selectedOption === "viewProjectProgress" ? "bg-indigo-50" : ""
            }`}
            onClick={() => handleOptionClick("viewProjectProgress")}
          >
            View Project Progress
          </button>
          <button
            className={`py-4 px-4 text-customGreenBlue text-lg font-medium rounded-md hover:bg-indigo-50 hover:text-customGreenBlue transition duration-300 ${
              selectedOption === "collaborate" ? "bg-indigo-50" : ""
            }`}
            onClick={() => handleOptionClick("collaborate")}
          >
            Collaborate
          </button>
          <button
            className={`py-4 px-4 text-customGreenBlue text-lg font-medium rounded-md hover:bg-indigo-50 hover:text-customGreenBlue transition duration-300 ${
              selectedOption === "generateReport" ? "bg-indigo-50" : ""
            }`}
            onClick={() => handleOptionClick("generateReport")}
          >
            Generate Report
          </button>
        </ul>
      </div>
      <div className="w-4/5  p-4 bg-indigo-50 overflow-auto">
        {selectedOption === "createProject" && (
          <>
            <div className="h-full w-auto">
              <div className="flex h-1/3 w-full ">
                <div className="p-2 h-1/2 w-1/5 flex justify-center">
                  <button
                    className="w-full h-full text-white font-bold bg-indigo-400 hover:bg-indigo-300 transition duration-300"
                    onClick={togglePopup}
                  >
                    Create a new Project
                  </button>
                </div>
                {isOpen && (
                  <div className="ml-4 p-2 h-2/3 w-1/4 border border-gray-300 relative">
                    <input
                      type="text"
                      id="project_title"
                      className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-indigo-500 focus:outline-none"
                      placeholder="Project Title"
                      required
                    ></input>
                    <button
                      onClick={createProject}
                      className="absolute text-white  bottom-3 right-3 bg-indigo-400 py-2 px-4 rounded-lg hover:bg-indigo-300 transition duration-300"
                    >
                      Create
                    </button>
                  </div>
                )}
              </div>

              <div className="h-4/6 w-full">
                <h1 className="ml-2 font-bold text-2xl text-indigo-500">
                  Your Projects
                </h1>
                <div className=" h-4/5 w-auto flex flex-wrap">
                  {projects.map((project) => (
                    <div
                      className="relative bg-white text-indigo-500 font-bold m-2 p-2 rounded-lg shadow-lg h-1/2 w-1/6 mt-5 hover:bg-gray-200"
                      key={project.id}
                    >
                      <button
                        onClick={() => {
                          setSelectedOption("manageTask"),
                            setSelectedProject(project.id);
                        }}
                      >
                        {project.name}
                      </button>
                      <button
                        className="absolute bottom-1 right-4 text-2xl"
                        onClick={handledropdown}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </button>
                      <button
                        className="absolute bottom-1 left-3 text-2xl hover:text-red-500"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {selectedOption === "assignTasks" && (
          <div>
            <h1>This is Assign tasks window</h1>
          </div>
        )}
        {selectedOption === "manageTask" && (
          <>
            <div className="flex justify-center">
              <h1 className="ml-2 font-bold text-3xl text-indigo-500">
                Project Workspace
              </h1>
            </div>
            <div>
              <h1 className="ml-2 font-bold text-2xl text-indigo-500 mt-5">
                {projects.map((project) => {
                  if (project.id === selectedProject) {
                    return project.name;
                  }
                })}
              </h1>
            </div>

            {/* Task adding starts here  */}
            <div className="flex h-1/3 w-full mt-3">
              <div className="p-2 h-1/2 w-1/5 flex justify-center">
                <button
                  className="w-full h-full text-white p-2 font-bold bg-indigo-400 hover:bg-indigo-300 transition duration-300"
                  onClick={togglePopup}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 font-bold" />{" "}
                  Add a new Task
                </button>
              </div>
              {isOpen && (
                <div className="ml-4 p-2 h-full w-1/3 border border-gray-300 relative">
                  <input
                    type="text"
                    id="task_name"
                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-indigo-500 focus:outline-none"
                    placeholder="Task name"
                    required
                  ></input>

                  <select
                    id="task_status"
                    className="mt-2 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Task Status
                    </option>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>

                  <DatePicker
                    selected={deadline}
                    onChange={handleDateChange}
                    className="mt-2 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-indigo-500 focus:outline-none"
                  />

                  <button
                    onClick={createTask}
                    className="absolute text-white  bottom-3 right-3 bg-indigo-400 py-2 px-4 rounded-lg hover:bg-indigo-300 transition duration-300"
                  >
                    Create
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col mt-5">
              <h2 className="ml-2 font-bold text-xl text-indigo-500">To Do</h2>
              <div className="flex flex-wrap">
                {tasks.map((task) => {
                  if (task.status === "todo") {
                    return (
                      <div
                        className="h-36 w-64 border relative bg-white text-indigo-500 font-bold m-2 p-2 rounded-lg shadow-lg mt-5 hover:bg-gray-200"
                        key={task.id}
                      >
                        <p>{task.name}</p>
                        <p className="mt-2 text-red-500">
                          <FontAwesomeIcon icon={faClock} />{" "}
                          {convertDate(task.deadline)}
                        </p>

                        <button
                          className="absolute bottom-1 right-4 text-2xl"
                          onClick={handledropdown}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <button
                          className="absolute bottom-1 left-3 text-2xl hover:text-red-500"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    );
                  }
                })}
              </div>

              <h2 className="ml-2 font-bold text-xl text-indigo-500">
                In Progress
              </h2>
              <div className="flex flex-wrap">
                {tasks.map((task) => {
                  if (task.status === "inprogress") {
                    return (
                      <div
                        className="h-36 w-64 border relative bg-white text-indigo-500 font-bold m-2 p-2 rounded-lg shadow-lg mt-5 hover:bg-gray-200"
                        key={task.id}
                      >
                        <p>{task.name}</p>
                        <p className="mt-2 text-red-500">
                          <FontAwesomeIcon icon={faClock} />{" "}
                          {convertDate(task.deadline)}
                        </p>

                        <button
                          className="absolute bottom-1 right-4 text-2xl"
                          onClick={handledropdown}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <button
                          className="absolute bottom-1 left-3 text-2xl hover:text-red-500"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
              <h2 className="ml-2 font-bold text-xl text-indigo-500">Done</h2>
              <div className="flex flex-wrap">
                {tasks.map((task) => {
                  if (task.status === "done") {
                    return (
                      <div
                        className="h-36 w-64 border relative bg-white text-indigo-500 font-bold m-2 p-2 rounded-lg shadow-lg mt-5 hover:bg-gray-200"
                        key={task.id}
                      >
                        <p>{task.name}</p>
                        <p className="mt-2 text-red-500">
                          <FontAwesomeIcon icon={faClock} />{" "}
                          {convertDate(task.deadline)}
                        </p>

                        <button
                          className="absolute bottom-1 right-4 text-2xl"
                          onClick={handledropdown}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <button
                          className="absolute bottom-1 left-3 text-2xl hover:text-red-500"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </>
        )}
        {selectedOption === "viewProjectProgress" && (
          <div>This is project progress</div>
        )}
        {selectedOption === "collaborate" && (
          <div>
            <h1>THis is collaborate</h1>
          </div>
        )}
        {selectedOption === "generateReport" && (
          <div>
            <h1>This is generate report</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
