import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For react-router-dom v7
import { useIdleTimer } from "react-idle-timer";

const IdleLogoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleOnIdle = () => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a timeout to logout after 5 minutes of being idle
    timeoutRef.current = setTimeout(() => {
      // Clear cookies and redirect to login
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      navigate("/auth/login");
    }, 5 * 60 * 1000); // 5 minutes
  };

  const handleOnActive = () => {
    // Clear the timeout when user becomes active
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const { getRemainingTime, getLastActiveTime, isIdle } = useIdleTimer({
    timeout: 15 * 60 * 1000, // 15 minutes
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <>{children}</>;
};

export default IdleLogoutWrapper;
