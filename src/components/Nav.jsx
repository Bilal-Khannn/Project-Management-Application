import { useAuth } from "../contexts/AuthContext";

function Nav() {
  const { signInwithGoogle, currentUser, logout } = useAuth();

  return (
    <div className="h-14 flex justify-around w-full">
      <div className="flex items-center">
        <a
          href="/"
          className="font-bold text-3xl hover:text-purple-500 transition duration-500"
        >
          PlanIt
        </a>
      </div>

      <ul className="flex justify-between items-center space-x-20">
        <li>
          <a
            href="/"
            className="hover:text-purple-500 transition duration-500 text-lg"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/"
            className="hover:text-purple-500 transition duration-500 text-lg"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/"
            className="hover:text-purple-500 transition duration-500 text-lg"
          >
            About
          </a>
        </li>
      </ul>
      <div className="flex items-center">
        <button
          className="text-white bg-pink-500 p-5 hover:bg-pink-400 transition duration-300"
          onClick={() =>
            signInwithGoogle()
              .then((user) => console.log(user))
              .catch((err) => console.log(err))
          }
        >
          Get Started
          {currentUser && <p>{currentUser.displayName}</p>}
        </button>
      </div>
    </div>
  );
}

export default Nav;
