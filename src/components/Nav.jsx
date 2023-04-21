import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import db from "../utils/init-firebase";
import { useEffect } from "react";

function Nav() {
  const { signInwithGoogle, currentUser, logout, setCurrentUser } = useAuth();

  function checkLogin() {
    if (currentUser) {
      document.getElementById("get-started").classList.add("hidden");
      document.getElementById("logout").classList.remove("hidden");
    } else {
      document.getElementById("get-started").classList.remove("hidden");
      document.getElementById("logout").classList.add("hidden");
    }
  }

  useEffect(() => {
    checkLogin();
  }, [currentUser]);

  return (
    <div className="h-14 flex justify-around w-full ">
      <div className="flex items-center">
        <a
          href="/"
          className="font-bold text-3xl hover:text-purple-500 transition duration-300"
        >
          PlanIt
        </a>
      </div>

      <ul className="flex justify-between items-center space-x-20">
        <li>
          <a
            href="/"
            className="hover:text-purple-500 transition duration-300 text-lg"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/"
            className="hover:text-purple-500 transition duration-300 text-lg"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/"
            className="hover:text-purple-500 transition duration-300 text-lg"
          >
            About
          </a>
        </li>
      </ul>

      {/* get started button and logout button */}
      <div className="flex items-center">
        <button
          id="get-started"
          className="text-white bg-pink-500 p-4 hover:bg-pink-400 transition duration-300"
          onClick={() =>
            signInwithGoogle()
              .then((user) => {
                const usersRef = doc(db, "users", user.user.uid);
                getDoc(usersRef).then((docSnapshot) => {
                  if (docSnapshot.exists()) {
                    onSnapshot(usersRef, (doc) => {
                      // do stuff with the data
                      console.log(" exist already");
                    });
                  } else {
                    setDoc(usersRef, {
                      name: user.user.displayName,
                      email: user.user.email,
                    }); // create the document
                  }
                });
              })
              .catch((err) => console.log(err))
          }
        >
          Get Started
          {/* {currentUser && <p>{currentUser.displayName}</p>} */}
        </button>
        <button
          id="logout"
          className="text-white bg-pink-500 p-4 hover:bg-pink-400 transition duration-300 hidden"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
