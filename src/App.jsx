import AuthContextProvider from "./contexts/AuthContext";
import Nav from "./components/Nav";
import Landing from "./components/Landing";

function App() {
  return (
    <AuthContextProvider>
      <Nav />
      <Landing />
    </AuthContextProvider>
  );
}

export default App;
