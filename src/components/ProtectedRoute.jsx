import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useModal } from "./ModalManager";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [hasTriedAuth, setHasTriedAuth] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!user && !hasTriedAuth) {
      // فتح المودال مرة واحدة فقط
      openModal('login');
      setHasTriedAuth(true);
    }
  }, [user, hasTriedAuth, openModal]);

  // لو المستخدم مش مسجل دخول، نعرض null أو loading component
  if (!user) {
    return <div className="text-center mt-2">
    <Alert variant="warning" className="mb-3">
     <p className="mb-0">"يجب تسجيل الدخول أولاً للدخول الي هذه الصفحة  "</p>
      </Alert>
      </div>
    
  }


    return children;
  
};

export default ProtectedRoute;