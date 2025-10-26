import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUsPage from "./pages/AboutUs/AboutUs"
import ServicesPage from "./pages/Services/Services"
import ResourcesPage from "./pages/Resources/Resources"
import ContactUsPage from "./pages/ContactUs/ContactUs"
import HomePage from "./pages/Home/Home"
import SinglePostTemplatePage from "./templates/SinglePostTemplate/SinglePostTemplate"

function App() {
  return (
    <Router>
      <div className="app">        
          <Routes>
            <Route path="/AboutUsPage" element={<AboutUsPage />} />
            <Route path="/ServicesPage" element={<ServicesPage />} />
            <Route path="/ResourcesPage" element={<ResourcesPage />} />
            <Route path="/ContactUsPage" element={<ContactUsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/post/:post_id" element={<SinglePostTemplatePage />} />
          </Routes>        
      </div>
    </Router>
  );
}

export default App;