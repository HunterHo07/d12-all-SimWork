import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from './Loader';

const RedirectHandler = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectActive, setRedirectActive] = useState(false);

  useEffect(() => {
    // Check if we're on a 404 page or other error page
    const checkAndRedirect = () => {
      // Use safe checks to prevent TypeErrors
      const isError = typeof document !== 'undefined' && document && (
        (document.title && document.title.includes('404')) || 
        document.querySelector('.error-page') ||
        (window && window.location && window.location.pathname === '/404')
      );
                       
      if (isError && !redirectActive) {
        setRedirectActive(true);
        // Show loading screen for 2 seconds then redirect directly to SimWork base path
        setTimeout(() => {
          // Redirect to the correct basePath from next.config.js
          router.push('/SimWork/');
        }, 2000);
      } else {
        // If not error page, finish loading after a short delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    // Run after component mount
    if (typeof window !== 'undefined' && window) {
      checkAndRedirect();
    }
  }, [router, redirectActive]);

  // Always show loader initially
  if (isLoading || redirectActive) {
    return <Loader showRedirectMessage={redirectActive} />;
  }

  // After loading, show actual content
  return <>{children}</>;
};

export default RedirectHandler;
