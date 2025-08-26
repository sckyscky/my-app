import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Navbar from './Components/Navbar/Navbar'; 
import Footer from './Components/Footer/Footer';
import ShopContextProvider from './Context/ShopContext';
import Main from './Pages/Main';
import Cart from './Pages/Cart';
import Account from './Pages/Account';
import './App.css';

// Error boundary wrapper for routes
const RouteWithErrorBoundary = ({ element: Element }) => (
  <ErrorBoundary>
    <Element />
  </ErrorBoundary>
);

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3
    }}
  >
    {children}
  </motion.div>
);

// Wrapper component to use useLocation with AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <PageTransition>
              <RouteWithErrorBoundary element={Main} />
            </PageTransition>
          }
        />
        <Route
          path='/cart'
          element={
            <PageTransition>
              <RouteWithErrorBoundary element={Cart} />
            </PageTransition>
          }
        />
        <Route
          path='/account'
          element={
            <PageTransition>
              <RouteWithErrorBoundary element={Account} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Error logging service
const logError = (error, errorInfo) => {
  // In a real app, send this to an error tracking service
  console.error('Application Error:', error, errorInfo);
};

function App() {
  const [hasError, setHasError] = useState(false);

  // Global error handler
  useEffect(() => {
    const handleGlobalError = (event) => {
      setHasError(true);
      logError(event.error || 'Unknown error', {
        componentStack: event.error?.stack || 'No stack trace',
      });
    };

    const handleUnhandledRejection = (event) => {
      setHasError(true);
      logError(event.reason || 'Unhandled promise rejection', {
        componentStack: event.reason?.stack || 'No stack trace',
      });
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    return (
      <div className="global-error">
        <h2>Something went wrong</h2>
        <p>We're working on fixing this issue. Please try refreshing the page.</p>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <ShopContextProvider>
          {!hasError && <Navbar />}
          <AnimatedRoutes />
          {!hasError && <Footer />}
        </ShopContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
