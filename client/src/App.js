// Import the NewsletterPage component
import NewsletterPage from "./pages/NewsletterPage";
import Preferences from "./pages/Preferences";
import "./App.css"; // Assuming you want to keep this for global styles

function App() {
  return (
    <div className="App">
      {/* Render the NewsletterPage component */}
      <Preferences />
      <NewsletterPage />
    </div>
  );
}

export default App;
