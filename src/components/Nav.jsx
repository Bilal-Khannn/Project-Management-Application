import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import db from "../utils/init-firebase";

function Nav() {
  const { signInwithGoogle, currentUser, logout, setCurrentUser } = useAuth();

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
          {currentUser && <p>{currentUser.displayName}</p>}
        </button>
        <button
          className="text-white bg-pink-500 p-5 hover:bg-pink-400 transition duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
