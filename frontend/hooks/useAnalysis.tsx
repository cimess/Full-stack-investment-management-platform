import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../lib/axios.tsx'; 

export const useAnalytics = () => {
  const location = useLocation();
  
  // Generate a basic session ID if one doesn't exist
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  };

  // Track specific features (e.g., ran a calculation)
  const trackEvent = useCallback(async (eventName: string, metadata?: any) => {
    try {
      console.log("am correntling tracking")
        await api.post('/stream/event', {
            type: 'FEATURE_EVENT',
            eventName,
            metadata,
            sessionId: getSessionId()
        });
    } catch (e) {
      console.log("error",e)
        // Silently fail
    }
  }, []);

  // Track page visits AND time spent on the page
  useEffect(() => {
    const currentPath = location.pathname;
    const startTimeStamp = Date.now();

    // 1. Initial Page Load Event
    const trackPage = async () => {
      
      try {
        const response = await api.post('/stream/event', {
            type: 'PAGE_VISIT',
            eventName: currentPath,
            sessionId: getSessionId()
        });
        console.log("response",response)
      } catch (e) {
        
         // Silently fail
      }
    };
    
    const timer = setTimeout(trackPage, 500);

    // 2. The "Time Spent" payload dispatcher (Survives tab closure)
    const sendTimeSpentEvent = () => {
        const timeSpentMs = Date.now() - startTimeStamp;
        
        // Only track if they stayed on the page for more than 10 seconds
        if (timeSpentMs < 10000) return; 

        const durationSeconds = Math.round(timeSpentMs / 1000);

        const payload = {
            type: 'FEATURE_EVENT',
            eventName: 'time_spent',
            metadata: { 
                pageRoute: currentPath, 
                durationSeconds 
            },
            sessionId: getSessionId()
        };

        // We use standard fetch with keepalive. Like sendBeacon, this ensures 
        // the request finishes even if the browser actively destroys the tab.
        // It relies on Axios having stored the token in cookies or localStorage.
        try {
            // Note: If you use Bearer tokens in localStorage instead of HttpOnly cookies, 
            // you may need to append the header manually here: headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            fetch(api.defaults.baseURL + '/analytics/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Only needed if you don't use automatically injected HTTPOnly cookies
                    ...(localStorage.getItem('auth_token') ? { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` } : {})
                },
                body: JSON.stringify(payload),
                keepalive: true 
            }).catch(() => {});
        } catch (e) {
            // Silently fail
        }
    };

    // 3. Listener for when the user clicks the "X" on their browser tab
    window.addEventListener('beforeunload', sendTimeSpentEvent);

    return () => {
      // 4. Cleanup for when the user simply clicks to a different page within the app
      window.removeEventListener('beforeunload', sendTimeSpentEvent);
      clearTimeout(timer);
      sendTimeSpentEvent();
    };
  }, [location.pathname]);

  return { trackEvent };
};
