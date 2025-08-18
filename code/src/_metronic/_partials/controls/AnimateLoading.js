import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

function AnimateLoading() {
  const location = useLocation();
  const [width, setWidth] = useState(0);
  const animateTimeoutRef = useRef(null);
  const stopAnimateTimeoutRef = useRef(null);

  const scrollToTop = () => {
    const scrollToTopBtn = document.getElementById("kt_scrolltop");
    if (scrollToTopBtn) {
      scrollToTopBtn.click();
    }
  };

  const stopAnimate = () => {
    if (animateTimeoutRef.current) {
      clearTimeout(animateTimeoutRef.current);
      animateTimeoutRef.current = null;
    }
    if (stopAnimateTimeoutRef.current) {
      clearTimeout(stopAnimateTimeoutRef.current);
    }
    stopAnimateTimeoutRef.current = setTimeout(() => {
      setWidth(0);
    }, 300);
  };

  const animate = () => {
    const step = () => {
      setWidth(prev => {
        if (prev <= 100) {
          animateTimeoutRef.current = setTimeout(step, 30);
          return prev + 10;
        } else {
          stopAnimate();
          return prev;
        }
      });
    };
    step();
  };

  useEffect(() => {
    // route changed
    animate();
    scrollToTop();
    return () => {
      if (animateTimeoutRef.current) {
        clearTimeout(animateTimeoutRef.current);
      }
      if (stopAnimateTimeoutRef.current) {
        clearTimeout(stopAnimateTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="header-progress-bar" style={{ height: "3px", width: "100%" }}>
      {width > 0 && (
        <ProgressBar variant="info" now={width} style={{ height: "3px" }} />
      )}
    </div>
  );
}

export default AnimateLoading;
