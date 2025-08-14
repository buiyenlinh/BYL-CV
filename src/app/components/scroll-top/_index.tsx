// src/components/ScrollToTop.js
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopComponent = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    mainElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) {
      return;
    }

    const handleScroll = () => {
      setVisible(mainElement.scrollTop > 300);
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {visible && (
        <button
          onClick={scrollToTop}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition duration-300"
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopComponent;
