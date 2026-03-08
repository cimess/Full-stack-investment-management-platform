import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseLoadingRedirectOptions {
  initialMessage: string;
  loadingMessage: string;
  target?: string;
  initialDelay?: number;
  minLoadingTime?: number;
  action?: () => Promise<void>;
}

export const useLoadingRedirect = ({
  initialMessage,
  loadingMessage,
  target,
  initialDelay = 500, // Reduced from 3000
  minLoadingTime = 500, // Reduced from 2000
  action,
}: UseLoadingRedirectOptions) => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const startRedirect = async (overrideTarget?: string) => {
    setSuccess(true);
    setMessage(initialMessage);

    // Phase 1: Initial Success Message Delay
    setTimeout(async () => {
      setShowLoader(true);
      setMessage(loadingMessage);

      const fetchStart = Date.now();

      // Phase 2: Execute optional action (e.g., pre-fetching)
      try {
        if (action) {
          await action();
        }
      } catch (error) {
        console.error("Action failed in redirect hook:", error);
      }

      // Phase 3: Ensure minimum loading time for smooth transition
      const elapsed = Date.now() - fetchStart;
      const remainingDelay = Math.max(0, minLoadingTime - elapsed);

      setTimeout(() => {
        const finalTarget = overrideTarget || target;
        if (finalTarget) {
          navigate(finalTarget);
        }
      }, remainingDelay);
    }, initialDelay);
  };

  return {
    startRedirect,
    showLoader,
    success,
    message,
    setSuccess,
    setMessage,
  };
};
