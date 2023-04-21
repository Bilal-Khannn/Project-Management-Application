import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Landing() {
  const { currentUser } = useAuth();

  return (
    <>
      {/* Home screen  */}
      <div className=" h-screen w-full  flex bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-400">
        <div className="w-1/2 flex justify-center items-center flex-col">
          <p className="w-10/12 text-5xl font-bold text-white">
            Introducing PlanIt - your all-in-one project management solution.
          </p>
          <p className="w-10/12 mt-4 text-xl text-white">
            Collaborate with your team members, assign tasks, and monitor
            progress, all from a single, intuitive dashboard.
          </p>
          {currentUser && (
            <Link
              className="mr-auto ml-14 mt-6 text-white font-bold bg-indigo-500 p-4 rounded-xl hover:bg-white hover:text-indigo-500 text-xl transition duration-300"
              to="/dashboard"
            >
              <button className="" style={{ alignSelf: "flex-start" }}>
                Dashboard <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          )}
        </div>

        <div className="flex justify-center items-center h-auto w-1/2">
          <img
            className="h-1/2 w-auto border b"
            src="src/assets/landingpage.png"
            alt="Project Management Image"
          />
        </div>
      </div>

      {/* Features */}
      <div id="features" className="w-full h-screen flex flex-col items-center">
        <h1 className="text-5xl font-bold mt-16">Features</h1>
        <div className="flex justify-center mt-12">
          {/* cards */}
          <div className="border-r-8 border-b-8 border-indigo-400 p-4 m-4 flex-grow rounded-tl-xl rounded-br-xl">
            <h2 className="text-xl font-bold">Project Creation</h2>
            <p className="mt-3">
              Create and organize new projects to manage work and track
              progress.
            </p>
            <button className="mt-7 text-white bg-indigo-500 p-2 hover:bg-indigo-400 transition duration-300 rounded-md">
              Read more
            </button>
          </div>
          <div className="border-r-8 border-b-8 border-purple-400 p-4 m-4 flex-grow rounded-tl-xl rounded-br-xl">
            <h2 className="text-xl font-bold">Task Assignment</h2>
            <p className="mt-3">
              Assign tasks to team members for efficient task management and
              completion.
            </p>
            <button className="mt-7 text-white bg-purple-500 p-2 hover:bg-purple-400 transition duration-300 rounded-md">
              Read more
            </button>
          </div>
          <div className="border-r-8 border-b-8 border-pink-400 p-4 m-4 flex-grow rounded-tl-xl rounded-br-xl">
            <h2 className="text-xl font-bold">Progress Tracking</h2>
            <p className="mt-3">
              Track progress of tasks to identify potential delays and ensure
              timely completion.
            </p>
            <button className="mt-7 text-white bg-pink-500 p-2 hover:bg-pink-400 transition duration-300 rounded-md">
              Read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
