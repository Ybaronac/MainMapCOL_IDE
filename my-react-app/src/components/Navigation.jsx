import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpenText,
  FileChartLine,
  Map,
  History,
  LibraryBig,
  Award,
  Menu,
  X,
} from "lucide-react";
import WebpageContent from "../config/WebpageContent";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMobileNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="menu-header">
      <div className="menu-container">
        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="menu-nav">
          <button
            onClick={() => navigate("/")}
            className={`menu-button ${isActive("/") ? "active" : ""}`}
            aria-label={WebpageContent.navigation_home}
            type="button"
          >
            <BookOpenText className="menu-button-icon" />
            <span>{WebpageContent.navigation_home}</span>
          </button>

          <button
            onClick={() => navigate("/about")}
            className={`menu-button ${isActive("/about") ? "active" : ""}`}
            aria-label={WebpageContent.navigation_about}
            type="button"
          >
            <FileChartLine className="menu-button-icon" />
            <span>{WebpageContent.navigation_about}</span>
          </button>

          <button
            onClick={() => navigate("/visualization-tool")}
            className={`menu-button ${isActive("/visualization-tool") ? "active" : ""}`}
            aria-label={WebpageContent.navigation_visualization_tool}
            type="button"
          >
            <Map className="menu-button-icon" />
            <span>{WebpageContent.navigation_visualization_tool}</span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className={`menu-button ${isActive("/history") ? "active" : ""}`}
            aria-label={WebpageContent.navigation_history}
            type="button"
          >
            <History className="menu-button-icon" />
            <span>{WebpageContent.navigation_history}</span>
          </button>

          <button
            onClick={() => navigate("/resources")}
            className={`menu-button ${isActive("/resources") ? "active" : ""}`}
            aria-label={WebpageContent.navigation_resources}
            type="button"
          >
            <LibraryBig className="menu-button-icon" />
            <span>{WebpageContent.navigation_resources}</span>
          </button>

          <button
            onClick={() => navigate("/credits")}
            className={`menu-button ${isActive("/credits") ? "active" : ""}`}
            aria-label={WebpageContent.navigation_credits}
            type="button"
          >
            <Award className="menu-button-icon" />
            <span>{WebpageContent.navigation_credits}</span>
          </button>
        </nav>

        <div className="menu-actions">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-menu-nav">
            <button
              onClick={() => handleMobileNavigate("/")}
              className={`menu-button mobile-menu-button ${isActive("/") ? "active" : ""}`}
            >
              <BookOpenText className="menu-button-icon" />
              <span>{WebpageContent.navigation_home}</span>
            </button>

            <button
              onClick={() => handleMobileNavigate("/about")}
              className={`menu-button mobile-menu-button ${isActive("/about") ? "active" : ""}`}
            >
              <FileChartLine className="menu-button-icon" />
              <span>{WebpageContent.navigation_about}</span>
            </button>

            <button
              onClick={() => handleMobileNavigate("/visualization-tool")}
              className={`menu-button mobile-menu-button ${isActive("/visualization-tool") ? "active" : ""}`}
            >
              <Map className="menu-button-icon" />
              <span>{WebpageContent.navigation_visualization_tool}</span>
            </button>

            <button
              onClick={() => handleMobileNavigate("/history")}
              className={`menu-button mobile-menu-button ${isActive("/history") ? "active" : ""}`}
            >
              <History className="menu-button-icon" />
              <span>{WebpageContent.navigation_history}</span>
            </button>

            <button
              onClick={() => handleMobileNavigate("/resources")}
              className={`menu-button mobile-menu-button ${isActive("/resources") ? "active" : ""}`}
            >
              <LibraryBig className="menu-button-icon" />
              <span>{WebpageContent.navigation_resources}</span>
            </button>

            <button
              onClick={() => handleMobileNavigate("/credits")}
              className={`menu-button mobile-menu-button ${isActive("/credits") ? "active" : ""}`}
            >
              <Award className="menu-button-icon" />
              <span>{WebpageContent.navigation_credits}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
