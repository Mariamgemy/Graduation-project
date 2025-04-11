import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaAngleUp } from 'react-icons/fa'; 
import './ScrollBtn.css'; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

  
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? 'show' : ''}`}>
      <Button variant="success" onClick={scrollToTop} className="rounded-circle p-3">
        <FaAngleUp size={28} />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;