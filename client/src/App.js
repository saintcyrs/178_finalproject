// Import the NewsletterPage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsletterPage from "./pages/NewsletterPage";
import Preferences from "./pages/Preferences";
import SignUpForm from './pages/SignUpForm';
import "./App.css"; // Assuming you want to keep this for global styles
import InterestForm from './pages/InterestForm'; 

/*
function App() {
  return (
    <div className="App">
      <SignUpForm />
      <Preferences />
      <NewsletterPage />
    </div>
  );
} 
*/


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/interests" element={<InterestForm />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
