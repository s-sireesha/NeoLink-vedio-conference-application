
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import SignUpForm from "./Signup/Signup.jsx";
import  Signin from "./Signin/Signin.jsx";
import JoinMeet from "./JoinMeet.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/joinmeet" element={<JoinMeet/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
