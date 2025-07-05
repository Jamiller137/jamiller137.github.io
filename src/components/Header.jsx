import React from "react";

const Header = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
    { id: "complex", label: "Complex" },
  ];

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">Jacob Miller</h1>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-button ${activeSection === item.id ? "active" : ""}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
