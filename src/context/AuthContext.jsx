import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // جلب بيانات المستخدم من localStorage إذا كانت موجودة
    const saved = localStorage.getItem("user");
    // console.log("جاري تحميل بيانات المستخدم من localStorage:", saved);
    return saved ? JSON.parse(saved) : null;
  });
  const [sessionExpired, setSessionExpired] = useState(false);

  // تسجيل الدخول: احفظ وقت الدخول
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());
    setSessionExpired(false);
  };

  // تسجيل الخروج: امسح كل شيء
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    setSessionExpired(false);
  };

  // تحقق من انتهاء الجلسة تلقائيًا
  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const now = Date.now();
        const diff = now - parseInt(loginTime, 10);
        if (diff >= 60 * 60 * 1000) {
          // 1 ساعة
          logout();
          setSessionExpired(true);
        }
      }
    };
    // افحص عند mount وعند تغيير المستخدم
    checkSession();
    // افحص كل دقيقة
    const interval = setInterval(checkSession, 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, sessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
