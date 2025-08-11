import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnimateLoading = ({ children }) => {
  const [routeChanged, setRouteChanged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setRouteChanged(true);
    const timer = setTimeout(() => {
      setRouteChanged(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {routeChanged && (
        <div className="animate__animated animate__fadeIn">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {!routeChanged && children}
    </>
  );
};

export default AnimateLoading;
