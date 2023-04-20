import React, { useState, useEffect } from "react";
import db from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const { currentUser } = useAuth();

  const handleOptionClick = (option) => {
    if (option === "createProject") {
      fetchProjects();
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
      <div className="w-4/5 p-4 bg-indigo-50">
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
                      <button className="absolute bottom-1 right-4 text-2xl">
                        <FontAwesomeIcon icon={faEllipsis} />
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
            <div className="flex flex-wrap"></div>
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
