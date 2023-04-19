import AuthContextProvider from "./contexts/AuthContext";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";

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
