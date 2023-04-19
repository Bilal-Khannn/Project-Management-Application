import React, { useState } from "react";
// import { AiOutlinePlus, FaBeer } from "react-icons/fa";

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

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
          <div className="h-screen w-auto bg-red-200">
            <div className="p-2 h-1/6 w-1/6">
              <button className="bg-customGreenBlue text-white rounded-md p-2">
                {/* <AiOutlinePlus /> */}
              </button>
            </div>
          </div>
        )}
        {selectedOption === "assignTasks" && (
          <div>
            <h1>This is Assign tasks window</h1>
          </div>
        )}
        {selectedOption === "manageTask" && (
          <div>
            <h1>This is manage tasks</h1>
          </div>
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
