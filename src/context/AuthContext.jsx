import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // جلب بيانات المستخدم من localStorage إذا كانت موجودة
    const saved = localStorage.getItem("user");
    // console.log("جاري تحميل بيانات المستخدم من localStorage:", saved);
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
  
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("تم حفظ بيانات المستخدم في localStorage");
  };

  const logout = () => {
    console.log("جاري تسجيل خروج المستخدم");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("تم حذف بيانات المستخدم من localStorage");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

