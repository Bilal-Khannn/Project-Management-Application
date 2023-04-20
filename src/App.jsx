import AuthContextProvider from "./contexts/AuthContext";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <Nav />
      {/* <Landing /> */}
      <Dashboard />
    </AuthContextProvider>
  );
}

export default App;
