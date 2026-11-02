
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {

  const { user, checking } = useAuth();

  
  if (checking) {
    return (
      <div className="page-message">
        Checking your account...
      </div>
    );
  }

 
  if (user) {
    return children;
  }

 
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
