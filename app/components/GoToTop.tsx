import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from 'lucide-react';

const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-foreground text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default GoToTop;
