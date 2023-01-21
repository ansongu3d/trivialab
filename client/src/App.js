//main react app that we're going to put all of our code that will display on the page
//Anything updated here will see automatically on the page

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Trivia } from "./components/Trivia";
import { Footer } from "./components/Footer";
import { Rank } from "./components/Rank";
import styles from "./index.css";

function App() {
  return (
    <div class="coloredSection">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
