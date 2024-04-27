import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsletterPage from "./pages/NewsletterPage";
//import Preferences from "./pages/Preferences";
import SignUpForm from "./pages/SignUpForm";
import "./App.css";
//import InterestForm from "./pages/InterestForm";
import CombinedPreferences from "./pages/CombinedPreferences"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/interests" element={<CombinedPreferences />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
