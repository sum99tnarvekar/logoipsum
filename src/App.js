import './App.css';
import React from 'react';
import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import { ModeCounter } from "./context/ModeCounter";
import NewsEverything from "./components/news-everything/NewsEverything";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsHeadlines from "./components/news-headlines/NewsHeadlines";
import NewsSources from "./components/news-sources/NewsSources";


function App() {
    const [mode, setMode] = React.useState(true);
  return (
      <>
          <ModeCounter.Provider value={{ mode, setMode }}>
              <Router>
                  <Navbar/>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/everything/:topic" element={<NewsEverything />} />
                      <Route path="/headlines" element={<NewsHeadlines />} />
                      <Route path="/sources" element={<NewsSources />} />
                      <Route path="/about" element={<AboutUs />} />
                  </Routes>
                  <Footer/>
              </Router>
          </ModeCounter.Provider>
      </>
  );
}

export default App;
