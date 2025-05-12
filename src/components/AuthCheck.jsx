import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCheck = ({ children, action }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.warning("يجب تسجيل الدخول أولاً للقيام بهذه العملية");
      navigate("/login");
      return;
    }

    if (action) {
      action(e);
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default AuthCheck;
