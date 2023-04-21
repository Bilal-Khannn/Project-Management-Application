// import AuthContextProvider from "./contexts/AuthContext";
// import Nav from "./components/Nav";
// import Landing from "./components/Landing";
// import Dashboard from "./components/Dashboard";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// function App() {
//   return (
//     <AuthContextProvider>
//       <Router>
//         <Nav />
//         <Route exact path="/" component={Landing} />
//         <Route path="/dashboard" component={Dashboard} />
//       </Router>

//       {/* <Nav />
//       <Landing /> */}
//       {/* <Dashboard /> */}
//     </AuthContextProvider>
//   );
// }

// export default App;

import AuthContextProvider from "./contexts/AuthContext";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
