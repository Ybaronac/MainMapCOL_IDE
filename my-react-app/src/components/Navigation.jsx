import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpenText,
  FileChartLine,
  Map,
  History,
  LibraryBig,
} from "lucide-react";
import WebpageContent from "../config/WebpageContent";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="menu-header">
      <div className="menu-container">
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
        </nav>
        
        <div className="menu-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
