import { useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Complex from "./components/Complex";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="App">
      <div className="content-wrapper">
        <Header
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main>
          {activeSection === "about" && <About />}
          {activeSection === "projects" && <Projects />}
          {activeSection === "contact" && <Contact />}
          {activeSection === "complex" && <Complex />}
        </main>
      </div>
    </div>
  );
}

export default App;
