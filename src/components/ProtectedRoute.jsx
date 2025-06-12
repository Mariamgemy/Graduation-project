import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // المستخدم مش مسجل دخول ⇒ نرجع لمكان فيه المودال أو نفتح المودال هنا
    return <Navigate to="/" state={{ showLogin: true }} />;
  }

  return children;
};

export default ProtectedRoute;
